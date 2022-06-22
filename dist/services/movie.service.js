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
export class MovieService {
    constructor() {
        this.createMovie = (body) => __awaiter(this, void 0, void 0, function* () {
            const { title, description, category } = body;
            return yield Movie.create({ title, description, category });
        });
        this.getMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            const movie = yield Movie.findOne({ _id: id });
            if (!movie) {
                return res.status(422).json({ message: "Movie doesn't exist" });
            }
            return res.status(200).json(movie);
        });
        this.updateMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, title, description, rating } = req.body;
            const movie = Movie.updateOne(id, title, description, rating);
            return res.status(200).json({ "movie": movie });
        });
        this.deleteMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            const movie = Movie.deleteOne({ _id: id });
            if (!movie) {
                return res.status(200).json({ message: "Movie doesn't delete" });
            }
            return res.status(200).json({ message: "Movie was successfully destroyed" });
        });
    }
}
