import express from "express";
const router = express.Router();
import { appContainer } from "../main";
import { TYPES } from "../types";
import "reflect-metadata";
const movieController = await appContainer.getAsync(TYPES.MovieController);
router.post("/", movieController.createMovie).get('/:id', movieController.getMovie).put('/', movieController.updateMovie).delete('/', movieController.deleteMovie).get('/category/:category', movieController.getMovieOfCategory).post('/category', movieController.createCategory);
export { router };
