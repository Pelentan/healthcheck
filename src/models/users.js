const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const validator = require("validator");
const uniVali = require('mongoose-unique-validator');
//const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    active: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    accessLevel: {
        type: Number,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    textProvider: {
        type: String
    },
    schedules:{
        type: Object,
    }
}, {
    timestamps: true
})

userSchema.plugin(uniVali);

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET) //thisismynewcourse

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

