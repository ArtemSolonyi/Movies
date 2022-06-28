import {IsNumber, isString, IsString, MaxLength, MinLength} from "class-validator";
import mongoose from "mongoose";

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

export class updateMovieDto extends MovieDto {
    id: mongoose.Types.ObjectId
}

export class setRatingMovieDto {
    @IsString()
    movieId: mongoose.Types.ObjectId
    @IsString()
    userId: mongoose.Types.ObjectId
    @IsNumber()
    rating: number
}