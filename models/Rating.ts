import mongoose, {Schema} from "mongoose"
export interface IRating extends mongoose.Document {
    movie: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId,
    user:mongoose.Types.ObjectId,
    rating:number,
}

const RatingSchema: Schema = new mongoose.Schema({
    movie: {
        type:mongoose.Types.ObjectId,
        ref:"Movie",
        required: true,
    },
    rating:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    ratingAvg:{
        type:Number,
        required:false
    }
});

export let Rating = mongoose.model<IRating>("Rating", RatingSchema);