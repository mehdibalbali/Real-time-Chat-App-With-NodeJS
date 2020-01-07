const mongoose = require('mongoose')
const validator = require('validator') 


// to create a new mode of user 
const User = mongoose.model('User', {
    username: {
        type : String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true ,
        trim: true,// enlever les espaces blancs
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7, // minimum 7 caracteres 
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain password')
            }
        }
    }
})

module.exports = User  