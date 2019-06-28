const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require("validator")

const moduleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  port: {
    type: Number,
    required: false,
  },
  addHeaders: {
    type: Array,
    required: false
  },
  requestType: {
    type: String,
    required: true,
  },
  timeout: {
    type: Number,
    required: false,
  },
  statusGood: {
    type: Number,
    required: false,
  },
  returnType: {
    type: String,
    required: true
  },
  dataPost: {
    type: Object,
  },
  dataReturn: {
    type: Object,
  },
  authType: {
    type: Object,
  },   
  authTrigger: {
    type: String,
    required: false,
  },
});
