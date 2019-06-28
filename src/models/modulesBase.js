const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require("validator")

const moduleBaseSchema = new Schema({  
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  file: {
    type: String,
    required: true,
    trim: true,
  },
  requestType: {
    type: String,
    required: true,
    trim: true,
  },
  timeout: {
    type: Number,
    required: true,
    trim: true,
  },
  statusGood: {
    type: Number,
    required: true,
    trim: true,
  },
  returnType: {
    type: String,
    required: true,
    trim: true,
  },
});


const ModuleBase = mongoose.model('ModuleBases', moduleBaseSchema);

module.exports = ModuleBase;