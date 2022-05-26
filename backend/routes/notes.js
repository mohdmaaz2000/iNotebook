const express = require('express')
const route = express.Router();


route.get('/',(req,res)=>{
    obj = {
        name : "Mohd Maaz",
        age : 21
    } 
    res.json(obj);
});

module.exports = route;