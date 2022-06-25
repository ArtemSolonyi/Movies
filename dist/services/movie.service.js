var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { injectable } from "inversify";
let MovieService = class MovieService {
    constructor() {
        this.createMovie = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, category } = body;
                const movie = yield Movie.create({ title, description, category: category });
                return { "movie": movie };
            }
            catch (e) {
                return e.message;
            }
        });
        this.createCategory = (body) => __awaiter(this, void 0, void 0, function* () {
            const { category } = body;
            return yield Category.create({ category });
        });
        this.getMovie = (id) => __awaiter(this, void 0, void 0, function* () {
            const movie = yield Movie.findOne({ _id: id });
            return { "movie": movie, status: 200 };
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
        this.movieOfCategory = (category) => __awaiter(this, void 0, void 0, function* () {
            return Movie.find({ category: category });
        });
    }
};
MovieService = __decorate([
    injectable()
], MovieService);
export { MovieService };
