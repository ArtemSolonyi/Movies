import {

    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import {Multer} from "multer";

export class MovieDto {
    @MinLength(1, {each: true})
    @MaxLength(40, {each: true})
    @IsString()
    title: string;
    @MinLength(1, {each: true})
    @MaxLength(200, {each: true})
    @IsString()
    description: string;
    @IsString()
    category: string
}

export class FilesOfMovieDto {
    preview:Express.Multer.File
}

export class updateMovieDto extends MovieDto {
    id: mongoose.Types.ObjectId
}

export class getCategoriesMovie {
    @IsOptional()
    @MinLength(1, {each: true})
    category: string
}

export class setRatingMovieDto {
    @IsOptional()
    movieId: string
    @IsOptional()
    userId: string
    @IsOptional()
    rating: number
}