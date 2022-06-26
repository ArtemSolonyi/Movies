import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId, ref: "User",
        required: true
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true
    }
});
export const Movie = mongoose.model("Comment", CommentSchema);
//# sourceMappingURL=Comments.js.map