import express, {Router} from "express"

const router: Router = express.Router();
import {MovieService} from "../services/movie.service"
import {MovieController} from "../controllers/movie.controller";
import {ValidateMiddleware} from "../validations/validate.middleware";
import {MovieDto} from "../dto/movie.dto";

const movieController = new MovieController(new MovieService())

router.post("/",movieController.createMovie).get('/:id', movieController.getMovie).put('/', movieController.updateMovie).delete('/', movieController.deleteMovie).get('/category/:category',movieController.getMovieOfCategory).post('/category',movieController.createCategory)

export {router}
