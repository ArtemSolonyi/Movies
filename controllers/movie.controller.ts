import {MovieService} from '../services/movie.service'
import {Request, Response} from "express";


export class MovieController {
    private movie: MovieService;

    constructor(movieService: MovieService) {
        this.movie = movieService
    }
    createMovie = async (req: Request, res: Response) => {
        const result = await this.movie.createMovie(req, res)
        if (!result) {
            return res.status(500).json({"message": "Failed to create movie"})
        }
        return result
    }
    updateMovie = async (req: Request, res: Response) => {
        const result = await this.movie.updateMovie(req, res)
        if (!result) {
            return res.status(500).json({"message": "Failed to update movie"})
        }
        return result
    }
    getMovie = async (req: Request, res: Response) => {
        const result = await this.movie.getMovie(req, res)
        if (!result) {
            return res.status(500).json({"message": "Failed to receive movie"})
        }
        return result
    }
    deleteMovie = async (req: Request, res: Response) => {
        const result = await this.movie.deleteMovie(req, res)
        if (!result) {
            return res.status(500).json({"message": "Failed to delete movie"})
        }
        return result
    }

}