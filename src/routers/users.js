const express = require('express')
const User = require('../models/users')
//const auth = require('../middleware/auth')
const router = new express.Router

router.get('/users', async(req, res)=>{
  res.send('Checen fer userses!\n');
})

module.exports = router