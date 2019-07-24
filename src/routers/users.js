const express = require('express')
const User = require('../models/users')
//const auth = require('../middleware/auth')
const router = new express.Router

router.get('/users', async(req, res)=>{
  console.log(req.params);
  res.send("hello");
});

router.post('/users', async(req, res)=>{
  const user = new User(req.body);
  console.log(req.params);
  res.status(200).send(user);
});

module.exports = router