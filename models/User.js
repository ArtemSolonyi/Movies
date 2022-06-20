import mongoose from "mongoose"
import validator from "validator"

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
});

export const User =  mongoose.model("User", UserSchema);