import mongoose from "mongoose";

export const connectDB = (connectionString: string | undefined) => {
    // @ts-ignore
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}