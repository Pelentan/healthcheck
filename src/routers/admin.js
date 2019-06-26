const express = require('express')
const router = new express.Router

router.get('/', async(req, res)=>{
  res.send('Hello Dave!  Would you like to play a game? How about Jumanji? Toga time!\n');
})


module.exports = router