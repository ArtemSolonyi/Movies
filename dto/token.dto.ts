import mongoose from "mongoose";

export class TokenDto {
    accessToken: string
    refreshToken: string;
    _id:mongoose.Types.ObjectId


}