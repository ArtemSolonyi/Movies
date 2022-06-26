import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class UserDto {
    @IsString()
    @MinLength(7)
    @MaxLength(15)
    username: string;
    @IsEmail()
    @IsString()
    @MinLength(5)
    email: string;
    @IsString()
    @MinLength(7)
    password: string
}