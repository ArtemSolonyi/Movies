import {MovieService} from '../services/movie.service'
import {Request, Response} from "express";
import {MovieDto} from "../services/movie.dto";

export class MovieController {
    private movie: MovieService;

    constructor(movieService: MovieService) {
        this.movie = movieService
    }

    createMovie = async (req: Request<{},{},MovieDto>, res: Response) => {
        const result = await this.movie.createMovie(req.body)
        if (!result) {
            return res.status(500).json({"message": "Failed to create movie"})
        }
        return res.status(200).json(result)
    }
    updateMovie = async (req: Request<{},{},MovieDto>, res: Response) => {
        const result = await this.movie.updateMovie(req.body)
        if (!result) {
            return res.status(500).json({"message": "Failed to update movie"})
        }
        return res.status(result.status).json(result.movie)
    }

    getMovie = async (req: Request<{id:string},{},MovieDto,{}>, res: Response) => {
        const result = await this.movie.getMovie(req.params.id)
        if (!result) {
            return res.status(500).json({"message": "Failed to receive movie"})
        }
        return res.status(result.status).json(result.movie)
    }

    deleteMovie = async (req: Request<{id:string},{},MovieDto>, res: Response) => {
        const result = await this.movie.deleteMovie(req.params.id)
        if (!result) {
            return res.status(500).json({"message": "Failed to delete movie"})
        }
        return result
    }
    getMovieOfCategory = async(req:Request<{},MovieDto>,res:Response)=>{
        const result = await this.movie.movieOfCategory(req.body)
        if (!result) {
            return res.status(500).json({"message": "Failed to delete movie"})
        }
        return res.status(200).json(result)
    }



}
// Category(Boeviki - > movie_id)