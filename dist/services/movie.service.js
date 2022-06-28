var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Movie } from '../models/Movie';
import { Rating } from '../models/Rating';
import { Category } from "../models/Category";
import mongoose from "mongoose";
import { injectable } from "inversify";
import "reflect-metadata";
let MovieService = class MovieService {
    async createMovie(body) {
        try {
            const { title, description, category } = body;
            const movie = await Movie.create({ title, description, category: category });
            return { "movie": movie };
        }
        catch (e) {
            return e.message;
        }
    }
    async createCategory(body) {
        const { category } = body;
        return await Category.create({ category });
    }
    async getMovie(id) {
        const movie = await Movie.findOne({ _id: id }).lean();
        return { "movie": movie, status: 200 };
    }
    async updateMovie(body) {
        const { title, description, category, id } = body;
        const movie = await Movie.findOneAndUpdate({ _id: id }, { title, description, category }).lean();
        return { "movie": movie, status: 200 };
    }
    async deleteMovie(id) {
        const movie = await Movie.deleteOne({ _id: id }).lean();
        if (movie) {
            return { "movies": await Movie.find(), status: 200 };
        }
    }
    async movieOfCategory(category) {
        return await Movie.find({ category: category });
    }
    async setRatingFromUser(body) {
        const ObjectId = mongoose.Types.ObjectId;
        const { movieId, userId, rating } = body;
        const updateRating = await Rating.findOneAndUpdate({ movie: movieId, user: userId }, { rating: rating });
        if (!updateRating) {
            await Rating.create({ movie: movieId, user: userId, rating: rating });
        }
        const ratings = await Rating.aggregate([{ $match: { movie: ObjectId(`${movieId}`) } }, {
                "$group": {
                    _id: null,
                    "ratingAvg": { "$avg": "$rating" }
                }
            }]).exec();
        const movie = await Movie.findOneAndUpdate({ _id: movieId }, { rating: ratings[0].ratingAvg }, { returnDocument: 'after' });
        return movie;
    }
};
MovieService = __decorate([
    injectable()
], MovieService);
export { MovieService };
//# sourceMappingURL=movie.service.js.map