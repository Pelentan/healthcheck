const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const db = process.env.MONGODB;
const databaseName = process.env.MONGODBNAME
const connectionURL = `mongodb://${db}/${databaseName}`

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    authSource: "admin",
    user: process.env.MONGOUSER,
    pass: process.env.MONGOPASS
}).then(() => {
    console.log("connected")
}).catch((err)=>{
    console.log("connection failed: ")
    console.log(err)
})
