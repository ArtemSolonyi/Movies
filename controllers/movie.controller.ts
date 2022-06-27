import {TYPES} from "../types";
import express, {Request, Response, Router} from "express";
import {MovieDto, updateMovieDto} from "../dto/movie.dto";
import mongoose from "mongoose";
import {injectable, inject} from "inversify";
import {MovieService} from "../services/movie.service";
import "reflect-metadata"
import {validator} from "../validations/validate.middleware";

@injectable()
export class MovieController {

    constructor(@inject(TYPES.MovieService) private movie: MovieService) {
    }

    private createMovie = async (req: Request<{}, {}, MovieDto>, res: Response) => {
        const result = await this.movie.createMovie(req.body)
        if (!result) {
            return res.status(500).json({"message": "Failed to create movie"})
        }
        return res.status(200).json(result)
    }
    private updateMovie = async (req: Request<{}, {}, updateMovieDto>, res: Response) => {
        const result = await this.movie.updateMovie(req.body)
        if (!result) {
            return res.status(500).json({"message": "Failed to update movie"})
        }
        return res.status(result.status).json(result.movie)
    }

    private getMovie = async (req: Request<{ id: string }, {}, MovieDto, {}>, res: Response) => {
        const result = await this.movie.getMovie(req.params.id)
        if (!result) {
            return res.status(500).json({"message": "Failed to receive movie"})
        }
        return res.status(result.status).json(result.movie)
    }

    private deleteMovie = async (req: Request<{ id: string }, {}, MovieDto>, res: Response) => {
        const result = await this.movie.deleteMovie(req.params.id)
        if (!result) {
            return res.status(500).json({"message": "Failed to delete movie"})
        }
        return result
    }
    private getMovieOfCategory = async (req: Request<{ category: mongoose.Types.ObjectId }, MovieDto>, res: Response) => {
        const result = await this.movie.movieOfCategory(req.params.category)
        if (!result) {
            return res.status(500).json({"message": "Failed to delete movie"})
        }
        return res.status(200).json(result)
    }
    private createCategory = async (req: Request<{ category: string }, MovieDto>, res: Response) => {
        const result = await this.movie.createCategory(req.body)
        if (!result) {
            return res.status(500).json({"message": "Failed to create category"})
        }
        return res.status(200).json(result)
    }
    public createRouter = () => {
        const router = express.Router()
        router.post("/", [validator(MovieDto)], this.createMovie).get('/:id', this.getMovie).put('/',validator(updateMovieDto),this.updateMovie).delete('/:id', this.deleteMovie).get('/category/:category', this.getMovieOfCategory).post('/category', this.createCategory)
        return router
    }
}
