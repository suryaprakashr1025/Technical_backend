const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors")
const admin = require("./router/adminRouter")
const user = require("./router/userRouter")
const pdf = require("./router/pdfRouter")

mongoose.connect(process.env.db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Database connected')
}).catch(()=>{
    console.log("Database is not connected")
})


app.use(cors({
    origin:"*",
}))

app.use(bodyParser.json())

app.use("/",admin)
app.use("/",user)
app.use("/book", express.static('uploadPdf'))
app.use("/",pdf)
app.listen(process.env.PORT,(err)=>{  
    if(err){
        console.log(`${process.env.PORT} is not working`)
    }  
    console.log(`server running on ${process.env.PORT} port...`)
})