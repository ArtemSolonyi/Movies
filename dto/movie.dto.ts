import {Contains, isBoolean, isEmail, IsString, isString, MaxLength, MinLength, minLength} from "class-validator";

export class MovieDto {
    @MinLength( 1, { each: true } )
    @MaxLength( 40, { each: true } )
    @IsString()
    title:string;
    @MinLength( 1, { each: true } )
    @MaxLength( 200, { each: true } )
    @IsString()
    description:string;
    @MinLength( 1, { each: true } )
    @MaxLength( 40, { each: true } )
    @IsString()
    category:string;

    @IsString()
    id:string;
}