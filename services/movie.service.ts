import {Movie} from '../models/Movie'
import {MovieDto} from "../dto/movie.dto";
import {Category} from "../models/Category"
import mongoose from "mongoose";
import {injectable} from "inversify";
import "reflect-metadata"


@injectable()
export class MovieService {
    async createMovie (body: MovieDto): Promise<object> {
        try {
            const {title, description, category} = body
            const movie = await Movie.create({title, description, category: category})
            return {"movie": movie}
        } catch (e: any) {
            return e.message
        }
    }
    async createCategory (body: MovieDto) {
        const {category} = body
        return await Category.create({category})
    }
    async getMovie (id: string) {
        const movie = await Movie.findOne({_id: id})
        return {"movie": movie, status: 200}
    }

    async updateMovie (body: MovieDto){
        const {title, description, category} = body
        const movie = await Movie.updateOne({title, description, category})
        return {"movie": movie, status: 200}
    }

    async deleteMovie (id: string){
        const movie = await Movie.deleteOne({_id: id})
        if (movie) {
            return {"movies": await Movie.find(), status: 200}
        }
    }
    movieOfCategory = async (category: mongoose.Types.ObjectId) => {
        return await Movie.find({category: category})
    }


}


