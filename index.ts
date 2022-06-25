import express, {Express} from 'express';
import mongoose, {ConnectOptions} from 'mongoose'
import dotenv from "dotenv"
import pkg from 'body-parser'
import {router as indexRoute} from './routes/movie'
import "reflect-metadata"
import {interfaces} from "inversify";
import Container = interfaces.Container;
dotenv.config()


export class App {

     start = async () => {
        try {

            const app: Express = express()
            const PORT: string | number = process.env.PORT || 3020
            app.use(pkg())
            app.use(express.json())

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
            app.listen(PORT, () =>
                console.log(`Server is listening on port ${PORT}...`)
            );

            app.use('/api/v1/movies', indexRoute)
            // @ts-ignore

        } catch (error) {
            console.log(error);
        }
    };
}

