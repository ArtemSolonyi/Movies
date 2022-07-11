import mongoose from "mongoose"

export interface IMovie extends mongoose.Document {
    title: string,
    description: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId,
    rating: number,
    slug:string,
}

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must provide title"],
    },
    slug:{
        type:String,
        required:[false,"Must provide slug"]
    },
    description: {
        type: String,
        required: [true, "must provide description"],
        minLength: [5, "Short description"],
        maxLength: [400, "So long description"]
    },
    preview:{
        type:String,
    },
    rating: {
        type: Number,
        required: false,
        default:0,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});
MovieSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});
export const Movie =   mongoose.model<IMovie>("Movie", MovieSchema);