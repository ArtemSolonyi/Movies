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

export let Category = mongoose.model<ICategoryDoc>("Category", CategorySchema);