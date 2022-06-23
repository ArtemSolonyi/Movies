import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    movie: {
        type: [{ type: mongoose.Types.ObjectId, ref: "Movie" }]
    }
});
export let Category = mongoose.model("Category", CategorySchema);
