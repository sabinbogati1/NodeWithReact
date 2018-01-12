var express = require("express");

var app = express();


app.get("/", (req,res) =>{
 
    res.send({bye: "buddy"});
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Running ........."); 
});