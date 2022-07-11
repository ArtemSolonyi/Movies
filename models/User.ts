import mongoose from "mongoose"
import validator from "validator"
export interface IUser extends mongoose.Document {
    username: string,
    email:string,
    password:string,
    role:string,
    _id: mongoose.Types.ObjectId
}

const UserSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        required: [true, "Must provide Username"],
        minlength: [3, "Short nickname will be highly them 3 symbols"],
        maxlength: [18, "Long nickname will be lowly them 18 symbols"],
    },
    email: {
        unique: true,
        type: String,
        required: [true, "must provide email"],
        minLength: [5, "Short email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email",
        },
    },
    password: {
        type: String,
        required: [true, "must provide password"],
        minlength: [7, "Short password"],
    },
    role: {
        type: String,
        enum: ["admin", "user"]
    }
});

export const User = mongoose.model<IUser>("User", UserSchema);