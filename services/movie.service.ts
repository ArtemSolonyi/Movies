import {Request, Response} from "express";
import {Movie} from '../models/Movie'


export class MovieService {
    createMovie = async (req: Request, res: Response) => {
        const {title, description, category} = req.body
        const movie = await Movie.create(title, description)
        return res.status(200).json({"movie": movie})
    }

    getMovie = async (req: Request, res: Response) => {
        const id = req.query.id
        const movie = await Movie.findOne({_id: id})
        if (!movie) {
            return res.status(422).json({message: "Movie doesn't exist"})
        }
        return res.status(200).json(movie)
    }

    updateMovie = async (req: Request, res: Response) => {
        const {id, title, description, rating} = req.body
        const movie = Movie.updateOne(id, title, description, rating)
        return res.status(200).json({"movie": movie})
    }

    deleteMovie = async (req: Request, res: Response) => {
        const id = req.query.id
        const movie = Movie.deleteOne({_id: id})
        if (!movie) {
            return res.status(200).json({message: "Movie doesn't delete"})
        }
        return res.status(200).json({message: "Movie was successfully destroyed"})
    }


}
