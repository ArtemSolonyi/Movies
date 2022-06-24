var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import pkg from 'body-parser';
import { router as indexRoute } from './routes/movie';
const app = express();
const PORT = process.env.PORT || 3020;
dotenv.config();
app.use(pkg());
app.use(express.json());
app.use('/api/v1/movies', indexRoute);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose
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
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
