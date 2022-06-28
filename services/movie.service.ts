import {Movie} from '../models/Movie'
import {Rating} from '../models/Rating'
import {MovieDto, setRatingMovieDto, updateMovieDto} from "../dto/movie.dto";
import {Category} from "../models/Category"
import mongoose from "mongoose";
import {injectable} from "inversify";
import "reflect-metadata"


@injectable()
export class MovieService {
    async createMovie(body: MovieDto): Promise<object> {
        try {
            const {title, description, category} = body
            const movie = await Movie.create({title, description, category: category})
            return {"movie": movie}
        } catch (e: any) {
            return e.message
        }
    }

    async createCategory(body: MovieDto) {
        const {category} = body
        return await Category.create({category})
    }

    async getMovie(id: string) {
        const movie = await Movie.findOne({_id: id}).lean()
        return {"movie": movie, status: 200}
    }

    async updateMovie(body: updateMovieDto) {
        const {title, description, category, id} = body
        const movie = await Movie.findOneAndUpdate({_id: id}, {title, description, category}).lean()
        return {"movie": movie, status: 200}
    }

    async deleteMovie(id: string) {
        const movie = await Movie.deleteOne({_id: id}).lean()
        if (movie) {
            return {"movies": await Movie.find(), status: 200}
        }
    }

    async movieOfCategory(category: mongoose.Types.ObjectId) {
        return await Movie.find({category: category})
    }

    async setRatingFromUser(body: setRatingMovieDto) {
        const ObjectId: any = mongoose.Types.ObjectId;
        const {movieId, userId, rating} = body
        const updateRating = await Rating.findOneAndUpdate({movie: movieId, user: userId}, {rating: rating})
        if (!updateRating) {
            await Rating.create({movie: movieId, user: userId, rating: rating})
        }
        const ratings: any = await Rating.aggregate([{$match: {movie: ObjectId(`${movieId}`)}}, {
            "$group": {
                _id: null,
                "ratingAvg": {"$avg": "$rating"}
            }
        }]).exec()
        return await Movie.findOneAndUpdate({_id: movieId}, {rating: ratings[0].ratingAvg}, {returnDocument: 'after'})


    }


}