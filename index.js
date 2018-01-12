var express = require("express");

var app = express();


app.get("/", (req,res) =>{
 
    res.send("Hi THere");
});


app.listen(5000, ()=>{
    console.log("Running ........."); 
});