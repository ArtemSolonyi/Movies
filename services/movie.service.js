import {Movie} from '../models/Movie.js'

export class MovieService {

    createMovie = async (req, res) => {
        const {title, description, rating} = req.body
        const movie = await Movie.create(title, description, rating)
        return res.status(200).json({"movie": movie})
    }

    getMovie = async (req, res) => {
        const id = req.query.id
        const movie = await Movie.findOne({_id: id})
        if (!movie) {
            return res.status(422).json({message: "Movie doesn't exist"})
        }
        return res.status(200).json(movie)
    }

    updateMovie = async (req, res) => {
        const {id, title, description, rating} = req.body
        const movie = Movie.updateOne(id, title, description, rating)
        return res.status(200).json({"movie": movie})
    }

    deleteMovie = async (req, res) => {
        const {id} = req.query.id
        const movie = Movie.deleteOne({_id: id})
        if (!movie) {
            return res.status(200).json({message: "Movie doesn't delete"})
        }
        return res.status(200).json({message: "Movie was successfully destroyed"})
    }


}
