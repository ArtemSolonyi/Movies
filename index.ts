import express,{Express} from 'express';

const app:Express = express()
const PORT:number | string = process.env.PORT || 5000

app.use(express.json())
app.listen(PORT, () => {console.log("App listen:localhost:" + PORT)})

