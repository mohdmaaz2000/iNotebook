const express = require('express')
const route = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_TOKEN = "Mynameismaaz";


//Route 1 :  Code for creating a new user usingh post, no login  (/api/auth/createUser)
route.post('/createUser', [

  // validation for name, email and password
  body('name', 'Minimum length of name is 3').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password too short').isLength({ min: 8 })
], async (req, res) => {

  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: success, errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ success: success, error: "Email already exist" });
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
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, JWT_TOKEN);
    console.log(token);
    success = true
    res.send({ success: success, token: token });
  }
  catch (err) {
    console.error(err.message);
    res.status(404).send({ success: success, error: "Something unexpected happened" });
  }
});

//Route 2 :  Creating a endpoint for login a user using post (/api/auth/login)
route.post('/login', [
  body('email', 'Enter valid email').isEmail()
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ success: success, error: "Enter valid Credentials" });
  }


  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send("Enter valid Credentials");
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(400).send({ success: success, error: "Enter valid Credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    success = true
    const token = jwt.sign(data, JWT_TOKEN);
    return res.send({ success: success, token: token });

  } catch (error) {
    return res.status(400).send({ success: success, error: "Enter valid Credentials" });
  }
});

// Route 3 : Creating a middleware for decoding jwt token using post (/api/auth/fetchUser)
route.post('/fetchUser', fetchuser, async (req, res) => {
  try {
    const UserId = req.user.id;
    const user = await User.findById(UserId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

module.exports = route;