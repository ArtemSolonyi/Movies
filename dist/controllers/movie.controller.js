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
import { MovieDto, setRatingMovieDto, updateMovieDto } from "../dto/movie.dto";
import { injectable, inject } from "inversify";
import { MovieService } from "../services/movie.service";
import "reflect-metadata";
import { validator } from "../validations/validate.middleware";
import { Authorization } from "../middlewares/checkUser";
let MovieController = class MovieController {
    constructor(movie) {
        this.movie = movie;
        this.createMovie = async (req, res) => {
            const result = await this.movie.createMovie(req.body);
            if (!result) {
                return res.status(500).json({ "message": "Failed to create movie" });
            }
            return res.status(200).json(result);
        };
        this.updateMovie = async (req, res) => {
            const result = await this.movie.updateMovie(req.body);
            if (!result) {
                return res.status(500).json({ "message": "Failed to update movie" });
            }
            return res.status(result.status).json(result.movie);
        };
        this.getMovie = async (req, res) => {
            const result = await this.movie.getMovie(req.params.id);
            if (!result) {
                return res.status(500).json({ "message": "Failed to receive movie" });
            }
            return res.status(result.status).json(result.movie);
        };
        this.deleteMovie = async (req, res) => {
            const result = await this.movie.deleteMovie(req.params.id);
            if (!result) {
                return res.status(500).json({ "message": "Failed to delete movie" });
            }
            return result;
        };
        this.getMovieOfCategory = async (req, res) => {
            const result = await this.movie.movieOfCategory(req.params.category);
            if (!result) {
                return res.status(500).json({ "message": "Failed to delete movie" });
            }
            return res.status(200).json(result);
        };
        this.createCategory = async (req, res) => {
            const result = await this.movie.createCategory(req.body);
            if (!result) {
                return res.status(500).json({ "message": "Failed to create category" });
            }
            return res.status(200).json(result);
        };
        this.getSetRatingToMovieFromUser = async (req, res) => {
            const result = await this.movie.setRatingFromUser(req.body);
            if (!result) {
                return res.status(500).json({ "message": "Failed to create category" });
            }
            return res.status(200).json(result);
        };
        this.createRouter = () => {
            const router = express.Router();
            router.post("/", [validator(MovieDto)], this.createMovie).get('/:id', this.getMovie).put('/', validator(updateMovieDto), this.updateMovie).delete('/:id', this.deleteMovie).get('/category/:category', this.getMovieOfCategory).post('/category', this.createCategory).patch('/rating', new Authorization().checkUser, validator(setRatingMovieDto), this.getSetRatingToMovieFromUser);
            return router;
        };
    }
};
MovieController = __decorate([
    injectable(),
    __param(0, inject(TYPES.MovieService)),
    __metadata("design:paramtypes", [MovieService])
], MovieController);
export { MovieController };
//# sourceMappingURL=movie.controller.js.map