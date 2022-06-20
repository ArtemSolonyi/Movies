import express from 'express';
const app = express()
const PORT  = process.env.PORT || 5000

app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("App listen:localhost:"+PORT)
    }
})