import express, {Express} from 'express';
import dotenv from "dotenv"
import {connectDB} from "./db/connect"


const app: Express = express()
const PORT: number | string = process.env.PORT || 5000

dotenv.config()

app.use(express.json())


const start = async () => {
    try {
        await connectDB(process.env.CONNECTION_DB);
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
