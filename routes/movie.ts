import express, {Router} from "express"

const router: Router = express.Router();
import {MovieService} from "../services/movie.service"
import {MovieController} from "../controllers/movie.controller";

const movieController = new MovieController(new MovieService())

router.post("/", movieController.createMovie).get('/:id', movieController.getMovie).put('/', movieController.updateMovie).delete('/', movieController.deleteMovie)

export {router}
