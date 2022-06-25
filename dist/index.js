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
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import pkg from 'body-parser';
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "./types";
import { MovieController } from "./controllers/movie.controller";
dotenv.config();
let App = class App {
    constructor(movie) {
        this.movie = movie;
        this.app = express();
        this.port = process.env.PORT || 3020;
        this.app.use(pkg());
        this.app.use(express.json());
    }
    useRoutes() {
        this.app.use('/api/v1/movies', this.movie.movieRouter);
    }
    async _start() {
        await mongoose
            .connect('mongodb+srv://artem123a123:Lemon123@cluster0.0eo3z.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then((res) => {
            console.log('Connected to Distribution API Database - Initial Connection');
        })
            .catch((err) => {
            console.log(`Initial Distribution API Database connection error occured -`, err);
        });
        this.app.listen(this.port, () => console.log(`Server is listening on port ${this.port}...`));
    }
    async init() {
        await this._start();
        this.useRoutes();
    }
};
App = __decorate([
    injectable(),
    __param(0, inject(TYPES.MovieController)),
    __metadata("design:paramtypes", [MovieController])
], App);
export { App };
