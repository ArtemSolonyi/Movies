import {TYPES} from "../types";
import express, {Request, Response, Router} from "express";
import {FilesOfMovieDto, getCategoriesMovie, MovieDto, setRatingMovieDto, updateMovieDto} from "../dto/movie.dto";
import {injectable, inject} from "inversify";
import {MovieService} from "../services/movie.service";
import "reflect-metadata"
import {validator} from "../validations/validate.middleware";
import {Authorization} from "../middlewares/checkUser";
import multer, {Multer} from "multer";
import {storage} from "../middlewares/files";

@injectable()
export class MovieController {
    upload:multer.Multer
    constructor(@inject(TYPES.MovieService) private movieService: MovieService) {
        this.upload = multer({storage: storage});
    }

    private createMovie = async (req: Request<{}, {}, MovieDto, {}, {}>, res: Response) => {
        console.log('qq')
        const result = await this.movieService.createMovie(req.body, req.files?.preview)
        if (!result) {
            return res.status(500).json({"message": "Failed to create movieService"})
        }
        return res.status(200).json(result)
    }
    private updateMovie = async (req: Request<{}, {}, updateMovieDto>, res: Response) => {
        const result = await this.movieService.updateMovie(req.body)
        if (!result) {
            return res.status(500).json({"message": "Failed to update movieService"})
        }
        return res.status(result.status).json(result.movie)
    }

    private getMovie = async (req: Request<{}, {}, {}, { slug: string }>, res: Response) => {
        const result = await this.movieService.getMovie(req.query.slug)
        if (!result) {
            return res.status(500).json({"message": "Failed to receive movieService"})
        }
        return res.status(result.status).json(result.movie)
    }

    private deleteMovie = async (req: Request<{ id: string }, {}, MovieDto>, res: Response) => {
        const result = await this.movieService.deleteMovie(req.params.id)
        if (!result) {
            return res.status(500).json({"message": "Failed to delete movieService"})
        }
        return result
    }
    private getMovieOfCategory = async (req: Request, res: Response) => {
        try {
            if (!req.query) {
                return res.status(422).json({"message": "Params is empty"})
            }
            const {category} = req.query
            const result = await this.movieService.movieOfCategory(category)
            return res.status(200).json(result)
        } catch (e) {
            return res.status(500).json('s')
        }
    }

    private getAllCategory = async (req: Request<{}, setRatingMovieDto>, res: Response) => {
        const result = await this.movieService.getCategories()
        if (!result) {
            return res.status(500).json({"message": "Failed to delete movieService"})
        }
        return res.status(200).json(result)
    }
    private createCategory = async (req: Request<{ category: string }, MovieDto>, res: Response) => {
        const result = await this.movieService.createCategory(req.body)
        if (!result) {
            return res.status(500).json({"message": "Failed to create category"})
        }
        return res.status(200).json(result)
    }
    private getSetRatingToMovieFromUser = async (req: Request<{}, setRatingMovieDto>, res: Response) => {
        try {
            const result = await this.movieService.setRatingFromUser(req.body)
            if (!result) {
                return res.status(500).json({"message": "Failed to set rating"})
            }
            return res.status(200).json(result)
        } catch (e) {
            return res.status(500).json(e)
        }


    }


    private getAllMovies = async (req: Request<{}, setRatingMovieDto>, res: Response) => {
        const result = await this.movieService.getAllMovies()
        if (!result) {
            return res.status(500).json({"message": "Failed to create category"})
        }
        return res.status(200).json(result)
    }

    public createRouter = () => {
        const router: Router = express.Router()
        router.route('/allcategories').post(this.createCategory).get(this.getAllCategory)
        router.route('/categories').get(validator(getCategoriesMovie), this.getMovieOfCategory)
        router.route('/slug/')
            .get(this.getMovie)
            .delete(this.deleteMovie)
        router.route('/rating')
            .patch(new Authorization().checkUser, this.getSetRatingToMovieFromUser)
        router.route('/')
            .get(this.getAllMovies)
            .put(validator(updateMovieDto), this.updateMovie)
            .post(validator(MovieDto), this.upload.single('preview'), this.createMovie)
        return router
    }
}
