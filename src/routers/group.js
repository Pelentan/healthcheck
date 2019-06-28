const express = require('express')
const Group = require('../models/groups')
//const auth = require('../middleware/auth')
const router = new express.Router

router.get('/groups', async(req, res)=>{
  const groups = await Group.find();
  res.send('Checkn fer groupses\n' + groups);
})

router.get('/groups/byid', async(req, res)=>{
  const id = "5d0bd94ed4e5190110e87593";
  const group = await Group.findById(id);
  res.send('Checkn fer specifes group\n' + group);
})

module.exports = router