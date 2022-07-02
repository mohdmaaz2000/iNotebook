const express = require('express')
const route = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');

const JWT_TOKEN = "Mynameismaaz";


// Code for creating a new user, no login
route.post('/createUser', [

  // validation for name, email and password
  body('name', 'Minimum length of name is 3').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password too short').isLength({ min: 8 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("Email already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    ;

    const data = {
      user:{
        id : user.id
      }
    }
    const token = jwt.sign(data, JWT_TOKEN);
    console.log(token);
    res.send(token);
  }
  catch (err) {
    console.error(err.message);
    res.status(404).send("Something unexpected happened");
  }
});

// Creating a endpoint for login a user
route.post('/login',[
  body('email', 'Enter valid email').isEmail()
], async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send("Enter valid Credentials");
  }

  const {email,password} = req.body
  try {
    const user = await User.findOne({email : email});

    if(!user){
    return res.status(400).send("Enter valid Credentials");
    }
    const compare =await bcrypt.compare(password, user.password);
    if(!compare){
      return res.status(400).send("Enter valid Credentials");
    }
    
    const data = {
      user : {
        id: user.id
      }
    }
    const token = jwt.sign(data,JWT_TOKEN);
    res.send(token);
    
  } catch (error) {
    res.status(400).send("Enter valid Credentials");
  }
});

module.exports = route;