const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require("validator")

//const jwt = require('jsonwebtoken')

const groupSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  users: {
    type: Array,
  },
});



groupData = {
    name: "Alpha",
    users: [1,2,3], 
}

const Group = mongoose.model('Group', groupSchema);

// const group = new Group(groupData);
// group.save().then(()=>{
//   console.log(me);
// }).catch((err)=>{
//   console.log(err);
// })

module.exports = Group;