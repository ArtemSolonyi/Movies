import express, {Router} from "express"

const router: Router = express.Router();
import {MovieController} from "../controllers/movie.controller";
import {appContainer} from "../main";
import {TYPES} from "../types";
import "reflect-metadata"

const movieController: MovieController = await appContainer.getAsync<MovieController>(TYPES.MovieController)
router.post("/", movieController.createMovie).get('/:id', movieController.getMovie).put('/', movieController.updateMovie).delete('/', movieController.deleteMovie).get('/category/:category', movieController.getMovieOfCategory).post('/category', movieController.createCategory)

export {router}
