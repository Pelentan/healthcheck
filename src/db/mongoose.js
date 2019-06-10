const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")


const databaseName = 'chron-api'
const connectionURL = `mongodb://ca-mongo/${databaseName}`

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    authSource: "admin",
    user: 'root',
    pass: 'tango'
}).then(() => {
    console.log("connected")
}).catch((err)=>{
    console.log("connection failed: ")
    console.log(err)
})

const userSchema = new Schema({
    name: {
        type: String
    }, 
    access: {
        type: Number
    },
    desert: {
        type: String
    }
})
const User = mongoose.model('Users', userSchema)

const you = new User({
    name: "Avaon",
    access: 7,
    desert: "dontask",
})

you.save().then(()=>{
    console.log("savey: " + you)
}).catch((err) =>{
    console.log("Ooopsie: ")
    console.log(err)
})