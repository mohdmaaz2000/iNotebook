const express = require('express')
const route = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

route.post('/',[
    body('name','Minimum length of name is 3').isLength( {min :3}),
    body('email','Enter valid email').isEmail(),
    body('password','Password too short').isLength({ min: 8 })
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email : req.body.email,
      password: req.body.password,
    }).then(user => res.json(user))
    .catch(err =>{
        console.log(err);
        res.send(err);
     });
});

module.exports = route;