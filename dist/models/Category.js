import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
});
CategorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export let Category = mongoose.model("Category", CategorySchema);
//# sourceMappingURL=Category.js.map