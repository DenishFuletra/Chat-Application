const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.get('/',(req,res)=>{
    res.send("api is running")
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server is started");
})