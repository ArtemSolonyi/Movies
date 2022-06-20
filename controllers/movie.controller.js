import {Movie} from '../models/Movie.js'

export class MovieService {
    createMovie = async (req,res) => {
        const {title,description,rating} = req.body
        const movie = await Movie.create(title,description,rating)
    }
}