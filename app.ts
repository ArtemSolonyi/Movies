import express, {Express} from 'express';
import mongoose, {ConnectOptions, Types} from 'mongoose'
import dotenv from "dotenv"
import pkg from 'body-parser'
import "reflect-metadata"
import {injectable, inject} from "inversify";
import {TYPES} from "./types";
import {MovieController} from "./controllers/movie.controller";
import {AuthController} from "./controllers/auth.controller";

dotenv.config()

@injectable()
export class App {
    app: Express
    port: number | string

    constructor(@inject(TYPES.MovieController) private movieController: MovieController,@inject(TYPES.AuthController) private authController: AuthController) {
        this.app = express()
        this.port = process.env.PORT || 3020
        this.app.use(pkg())
        this.app.use(express.json())
    }

    useRoutes() {
        this.app.use('/api/v1/movies', this.movieController.createRouter())
        this.app.use('/api/v1/auth',this.authController.createRouter())
    }

    async _start() {
        await mongoose
            .connect('mongodb+srv://artem123a123:Lemon123@cluster0.0eo3z.mongodb.net/?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions)
            .then((res) => {
                console.log(
                    'Connected to Distribution API Database - Initial Connection'
                );
            })
            .catch((err) => {
                console.log(
                    `Initial Distribution API Database connection error occured -`,
                    err
                );
            });
        this.app.listen(this.port, () =>
            console.log(`Server is listening on port ${this.port}...`)
        );
    }

    async init(): Promise<void> {
        this.useRoutes()
        await this._start()
    }
}











