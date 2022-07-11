import express, {Express, NextFunction} from 'express';
import mongoose, {ConnectOptions, Types} from 'mongoose'
import pkg from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from "cors";
import "reflect-metadata"
import {injectable, inject} from "inversify";
import {TYPES} from "./types";
import {MovieController} from "./controllers/movie.controller";
import {AuthController} from "./controllers/auth.controller";
import fileUpload from 'express-fileupload'
import dotenv from "dotenv/config"
import multer from "multer";
import path from "path";

@injectable()
export class App {
    app: Express
    port: number | string

    constructor(@inject(TYPES.MovieController) private movieController: MovieController,@inject(TYPES.AuthController) private authController: AuthController) {
        this.app = express()
        this.port = process.env.PORT || 3005
        this.app.use(pkg())
        this.app.use(express.json())
        this.app.use(cookieParser())
        this.app.use(pkg.urlencoded({extended:true}))
    }

    useRoutes() {
        this.app.use('/api/v1/movies', this.movieController.createRouter())
        this.app.use('/api/v1/auth',this.authController.createRouter())
    }
    useCors(){
        this.app.use(cors({origin:'*'}));
        this.app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            // @ts-ignore
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
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

        this.useCors()
        this.useRoutes()
        await this._start()
    }
}











