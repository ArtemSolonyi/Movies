var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { TYPES } from "../types";
import express from "express";
import { getCategoriesMovie, MovieDto, updateMovieDto } from "../dto/movie.dto";
import { injectable, inject } from "inversify";
import { MovieService } from "../services/movie.service";
import "reflect-metadata";
import { validator } from "../validations/validate.middleware";
import { Authorization } from "../middlewares/checkUser";
import multer from "multer";
import { storage } from "../middlewares/files";
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
        this.createMovie = async (req, res) => {
            var _a;
            console.log('qq');
            const result = await this.movieService.createMovie(req.body, (_a = req.files) === null || _a === void 0 ? void 0 : _a.preview);
            if (!result) {
                return res.status(500).json({ "message": "Failed to create movieService" });
            }
            return res.status(200).json(result);
        };
        this.updateMovie = async (req, res) => {
            const result = await this.movieService.updateMovie(req.body);
            if (!result) {
                return res.status(500).json({ "message": "Failed to update movieService" });
            }
            return res.status(result.status).json(result.movie);
        };
        this.getMovie = async (req, res) => {
            const result = await this.movieService.getMovie(req.query.slug);
            if (!result) {
                return res.status(500).json({ "message": "Failed to receive movieService" });
            }
            return res.status(result.status).json(result.movie);
        };
        this.deleteMovie = async (req, res) => {
            const result = await this.movieService.deleteMovie(req.params.id);
            if (!result) {
                return res.status(500).json({ "message": "Failed to delete movieService" });
            }
            return result;
        };
        this.getMovieOfCategory = async (req, res) => {
            try {
                if (!req.query) {
                    return res.status(422).json({ "message": "Params is empty" });
                }
                const { category } = req.query;
                const result = await this.movieService.movieOfCategory(category);
                return res.status(200).json(result);
            }
            catch (e) {
                return res.status(500).json('s');
            }
        };
        this.getAllCategory = async (req, res) => {
            const result = await this.movieService.getCategories();
            if (!result) {
                return res.status(500).json({ "message": "Failed to delete movieService" });
            }
            return res.status(200).json(result);
        };
        this.createCategory = async (req, res) => {
            const result = await this.movieService.createCategory(req.body);
            if (!result) {
                return res.status(500).json({ "message": "Failed to create category" });
            }
            return res.status(200).json(result);
        };
        this.getSetRatingToMovieFromUser = async (req, res) => {
            try {
                const result = await this.movieService.setRatingFromUser(req.body);
                if (!result) {
                    return res.status(500).json({ "message": "Failed to set rating" });
                }
                return res.status(200).json(result);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        };
        this.getAllMovies = async (req, res) => {
            const result = await this.movieService.getAllMovies();
            if (!result) {
                return res.status(500).json({ "message": "Failed to create category" });
            }
            return res.status(200).json(result);
        };
        this.createRouter = () => {
            const router = express.Router();
            router.route('/allcategories').post(this.createCategory).get(this.getAllCategory);
            router.route('/categories').get(validator(getCategoriesMovie), this.getMovieOfCategory);
            router.route('/slug/')
                .get(this.getMovie)
                .delete(this.deleteMovie);
            router.route('/rating')
                .patch(new Authorization().checkUser, this.getSetRatingToMovieFromUser);
            router.route('/')
                .get(this.getAllMovies)
                .put(validator(updateMovieDto), this.updateMovie)
                .post(validator(MovieDto), this.upload.single('preview'), this.createMovie);
            return router;
        };
        this.upload = multer({ storage: storage });
    }
};
MovieController = __decorate([
    injectable(),
    __param(0, inject(TYPES.MovieService)),
    __metadata("design:paramtypes", [MovieService])
], MovieController);
export { MovieController };
//# sourceMappingURL=movie.controller.js.map