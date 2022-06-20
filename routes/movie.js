import express from "express"

const router = express.Router();
import {MovieService} from "../services/movie.service.js"

const movieService = new MovieService()
router.post("/", movieService.createMovie).get(movieService.getMovie).put(movieService.updateMovie).delete(movieService.deleteMovie)

