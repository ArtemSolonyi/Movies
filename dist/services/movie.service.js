var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Movie } from '../models/Movie';
import { Category } from "../models/Category";
export class MovieService {
    constructor() {
        this.createMovie = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, category } = body;
                const movie = yield Movie.create({ title, description, category: category });
                yield Category.findOneAndUpdate({ category: category }, { $push: { movie: movie } });
                return { "movie": movie, "category": yield Category.findOne({ category: category }) };
            }
            catch (e) {
                return e.message;
            }
        });
        this.getMovie = (id) => __awaiter(this, void 0, void 0, function* () {
            return { "movie": 's', status: 200 };
        });
        this.updateMovie = (body) => __awaiter(this, void 0, void 0, function* () {
            const { title, description, category } = body;
            const movie = Movie.updateOne({ title, description, category });
            return { "movie": movie, status: 200 };
        });
        this.deleteMovie = (id) => __awaiter(this, void 0, void 0, function* () {
            const movie = yield Movie.deleteOne({ _id: id });
            if (movie) {
                return { "movies": yield Movie.find(), status: 200 };
            }
        });
        this.movieOfCategory = (body) => __awaiter(this, void 0, void 0, function* () {
        });
    }
}
