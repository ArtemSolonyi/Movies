import {IMovie, Movie} from '../models/Movie'
import {Rating} from '../models/Rating'
import {FilesOfMovieDto, MovieDto, setRatingMovieDto, updateMovieDto} from "../dto/movie.dto";
import {Category} from "../models/Category"
import mongoose from "mongoose";
import {injectable} from "inversify";
import "reflect-metadata"
import slugify from "slugify";
import multer, {Multer} from 'multer'
import express, {Request} from "express";
import fileUpload from "express-fileupload";


@injectable()
export class MovieService {
    async getAllMovies() {
        return await Movie.find()
    }

    async createMovie(body: MovieDto, preview: fileUpload.UploadedFile | fileUpload.UploadedFile[] | undefined): Promise<object> {
        try {
            console.log(preview)


            const {title, description, category} = body
            const slugId = slugify(title)
            const candidate = await Movie.findOne({slug: slugId})
            const movie = new Movie({title: title, description: description, category: category})
            if (candidate) {
                movie.slug = await (slugId + '-' + (Math.random() + 1).toString(36).substring(9))
            } else {
                movie.slug = slugId
            }
            await movie.save()

            return {"movie": movie}
        } catch (e: any) {
            return e.message
        }
    }

    async createCategory(body: MovieDto) {
        const {category} = body
        return await Category.create({category})
    }

    async getMovie(slug: string) {
        const movie = await Movie.findOne({slug: slug})
        return {"movie": movie, status: 200}
    }

    async updateMovie(body: updateMovieDto) {
        const {title, description, category, id} = body
        const movie = await Movie.findOneAndUpdate({_id: id}, {title, description, category})
        return {"movie": movie, status: 200}
    }

    async getCategories() {
        return await Category.find();
    }

    async deleteMovie(id: string) {
        const movie = await Movie.deleteOne({_id: id})
        if (movie) {
            return {"movies": await Movie.find(), status: 200}
        }
    }

    async movieOfCategory(category: any) {
        try {
            return await Movie.find({category: new mongoose.Types.ObjectId(`${category}`)})
        } catch (e) {
            return e
        }
    }

    async setRatingFromUser(body: setRatingMovieDto) {
        const ObjectId: any = mongoose.Types.ObjectId;
        const {movieId, userId, rating} = body
        const updateRating = await Rating.findOneAndUpdate({movie: movieId, user: userId}, {rating: rating})
        if (!updateRating) {
            await Rating.create({movie: movieId, user: userId, rating: rating})
        }
        const ratings: any = await Rating.aggregate([{$match: {movie: ObjectId(`${movieId}`)}}, {
            "$group": {
                _id: null,
                "ratingAvg": {"$avg": "$rating"}
            }
        }]).exec()
        return await Movie.findOneAndUpdate({_id: movieId}, {rating: ratings[0].ratingAvg}, {returnDocument: 'after'})

    }


}