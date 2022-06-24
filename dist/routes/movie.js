import express from "express";
const router = express.Router();
import { MovieService } from "../services/movie.service";
import { MovieController } from "../controllers/movie.controller";
const movieController = new MovieController(new MovieService());
router.post("/", movieController.createMovie).get('/:id', movieController.getMovie).put('/', movieController.updateMovie).delete('/', movieController.deleteMovie).get('/category/:category', movieController.getMovieOfCategory).post('/category', movieController.createCategory);
export { router };
