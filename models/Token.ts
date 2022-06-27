import mongoose from "mongoose"

export interface IToken extends mongoose.Document {
    accessToken: string,
    refreshToken: string,
    user: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId,

}
const TokenSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: [true, "Must provide accessToken"],
    },
    refreshToken: {
        type: String,
        required: [true, "must provide refreshToken"],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false,
    },
});

export const Token = mongoose.model<IToken>("Token", TokenSchema);