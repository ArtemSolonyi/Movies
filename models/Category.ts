import mongoose, {Schema, Types} from "mongoose"
interface ICategory extends mongoose.Document {
    category: string,
    movie: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId
}

export interface ICategoryDoc extends ICategory {
}

const CategorySchema: Schema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },


});
CategorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});
export let Category = mongoose.model<ICategoryDoc>("Category", CategorySchema);