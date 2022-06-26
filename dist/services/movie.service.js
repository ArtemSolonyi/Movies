var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Movie } from '../models/Movie';
import { Category } from "../models/Category";
import { injectable } from "inversify";
import "reflect-metadata";
let MovieService = class MovieService {
    constructor() {
        this.movieOfCategory = async (category) => {
            return await Movie.find({ category: category });
        };
    }
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
        const movie = await Movie.findOne({ _id: id });
        return { "movie": movie, status: 200 };
    }
    async updateMovie(body) {
        const { title, description, category } = body;
        const movie = await Movie.updateOne({ title, description, category });
        return { "movie": movie, status: 200 };
    }
    async deleteMovie(id) {
        const movie = await Movie.deleteOne({ _id: id });
        if (movie) {
            return { "movies": await Movie.find(), status: 200 };
        }
    }
};
MovieService = __decorate([
    injectable()
], MovieService);
export { MovieService };
//# sourceMappingURL=movie.service.js.map