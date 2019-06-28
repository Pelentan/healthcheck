const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require("validator")

const modelSchema = new Schema({
  name:  {
    type: String,
    required: true,
    trim: true
  }, 
  description: {
    type: String,
    required: false
  }, 
  fileName: {
    type: String,
    required: true,
    trim: true
  }, 
});

const DroneModel = new mongoose.model("DroneModel", modelSchema )

module.exports = DroneModel;