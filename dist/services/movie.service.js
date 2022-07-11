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
import slugify from "slugify";
let MovieService = class MovieService {
    async getAllMovies() {
        return await Movie.find();
    }
    async createMovie(body, preview) {
        try {
            console.log(preview);
            const { title, description, category } = body;
            const slugId = slugify(title);
            const candidate = await Movie.findOne({ slug: slugId });
            const movie = new Movie({ title: title, description: description, category: category });
            if (candidate) {
                movie.slug = await (slugId + '-' + (Math.random() + 1).toString(36).substring(9));
            }
            else {
                movie.slug = slugId;
            }
            await movie.save();
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
    async getMovie(slug) {
        const movie = await Movie.findOne({ slug: slug });
        return { "movie": movie, status: 200 };
    }
    async updateMovie(body) {
        const { title, description, category, id } = body;
        const movie = await Movie.findOneAndUpdate({ _id: id }, { title, description, category });
        return { "movie": movie, status: 200 };
    }
    async getCategories() {
        return await Category.find();
    }
    async deleteMovie(id) {
        const movie = await Movie.deleteOne({ _id: id });
        if (movie) {
            return { "movies": await Movie.find(), status: 200 };
        }
    }
    async movieOfCategory(category) {
        try {
            return await Movie.find({ category: new mongoose.Types.ObjectId(`${category}`) });
        }
        catch (e) {
            return e;
        }
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
        return await Movie.findOneAndUpdate({ _id: movieId }, { rating: ratings[0].ratingAvg }, { returnDocument: 'after' });
    }
};
MovieService = __decorate([
    injectable()
], MovieService);
export { MovieService };
//# sourceMappingURL=movie.service.js.map