const express = require('express')
const route = express.Router();
const User = require('../models/User');


route.post('/',(req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
});

module.exports = route;