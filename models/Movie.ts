import mongoose from "mongoose"

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must provide title"],
        minlength: [3, "Short nickname will be highly them 3 symbols"],
        maxlength: [18, "Long nickname will be lowly them 18 symbols"],
    },
    description: {
        type: String,
        required: [true, "must provide description"],
        minLength: [5, "Short description"],
        maxLength:[400,"So long description"]
    },
    rating: {
        type: Number,
        required: false,
    },
    category:{
        type:String,
        ref:'Category',
        required:true
    }
});

export const Movie =  mongoose.model("Movie", MovieSchema);