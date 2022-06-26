import mongoose from "mongoose";
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must provide title"],
    },
    description: {
        type: String,
        required: [true, "must provide description"],
        minLength: [5, "Short description"],
        maxLength: [400, "So long description"]
    },
    rating: {
        type: Number,
        required: false,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});
export const Movie = mongoose.model("Movie", MovieSchema);
//# sourceMappingURL=Movie.js.map