const express=require('express');
var bodyParser = require('body-parser')
const app=express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const router=require("./router/student");
const Student =require("./model/student.js");
app.use(router);
//app.use(cors());
const mongoose=require('mongoose');
mongoose.connect(mongodburl)
.then(()=>{
    console.log("connected..")
}).catch((err)=>{
    console.log(err);
})

app.listen(8080,()=>{
    console.log("listening..");
});
