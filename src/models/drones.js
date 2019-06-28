const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const moduleSchema = require('./moduleData');

const droneSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, 
  description: {
    type: String,
    required: false,
  },
  droneType: {
    type: String,
    required: true
  },
  droneBase: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
    required: true,
    trim: true
  }, 
  port: {
    type: Number,
    required: false,
  },
  headers: {
    type: Array,
    required: false,
  },
  active: {
    type: Boolean,
    required: true,
  },
  checkInterval: {
    type: Number,
    required: true,
    trim: true
  }, 
  checkInterval_on_fail: {
    type: Number,
    required: true,
    trim: true
  }, 
  continue: {
    type: Boolean,
    required: true,
  },
  cycleSuccessMsg: {
    type: String,
    required: true,
    trim: true
  }, 
  cycleType: {
    type: String,
    required: true,
  },
  cycleCount: {
    type: Number,
    required: true,
    trim: true
  }, 
  cycle: {
    type: Number,
    required: true,
    trim: true
  }, 
  alertGroup: {
    type: Number,
    required: true,
    trim: true
  }, 
  alertSchedule: {
    type: Number,
    required: true,
    trim: true
  },  
  errStatus: false,
  errThreshold: {
    type: Number,
    required: true,
    trim: true
  }, 
  errCount: {
    type: Number,
    required: false,
    trim: true
  },   
  moduleKit: [moduleSchema], 
});

droneSchema.statics.getGroupNames = async ()=>{
  const groups = await Drone.find({active: true},'droneType').distinct('droneType');
  return groups;
}

droneSchema.statics.getDronesByType = async (groups)=>{
  const drones = await Drone.find({droneType: groups, active: true}).catch((err)=>{console.log(err)});
  //console.log("data?: " + drones);
  return drones;
}

const Drone = mongoose.model('Drones', droneSchema);

module.exports = Drone;

