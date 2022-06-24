import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
});
export let Category = mongoose.model("Category", CategorySchema);
