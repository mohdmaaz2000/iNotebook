const express = require('express')
const route = express.Router();


route.get('/',(req,res)=>{
    obj = []
    res.json(obj);
});

module.exports = route;