//Express FrameWork for Fast-Tracking

const express=require("express");

//routing all the api's
const route=require("./routing_api");


//For converting the data to JSON
const bodyParser=require("body-parser");

//For DataBase Connecion
const mongoose=require("mongoose");

//For Security(based on jws token)
const jwt=require("jsonwebtoken");

//settingup the express app
const app=express();

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/hospitals",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise=global.Promise;

//MiddleWare
app.use(bodyParser.json());

//Initialize the route
app.use('/api',route);

//error handling middleware(MiddleWare)
app.use((err,req,res,next)=>{
    res.send({error:err.message});
});

//Listen for request
app.listen(3000,()=>{
    console.log("server is running...");
});


