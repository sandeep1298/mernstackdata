const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require("express");
const cookieParser = require('cookie-parser');
const app=express();
const router = express.Router();
var nodemailer = require('nodemailer');
const { getMaxListeners } = require("./models/userSchema");


app.use(cookieParser());
dotenv.config({path:'./config.env'});
require('./db/conn');
//const Users = require('./models/userSchema');
app.use(express.json());
app.use(require('./router/auth'));
//heroku 1
const PORT = process.env.PORT || 5000;



//Middleware
// const middleware =(req,res,next)=>{
//     console.log("hello middle");
//     next();
// }


// app.get('/',(req,res)=>{
//     res.send("ello idiya");
// })
// app.get('/home',(req,res)=>{
//     res.send("This is home page");
// })
// app.get('/about', middleware,(req,res)=>{
//     console.log("about");
//     res.send("This is about page");
// })
// app.get('/demo',(req,res)=>{
//     res.send("This is demo page");
// })
//heroku 2
if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
}

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
})