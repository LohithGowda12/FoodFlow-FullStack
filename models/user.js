//schema

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

//create schema

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[30,'Your name cannot exceed 30 characters']

    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please enter a valid email address']
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minLength:[6,'Your password must be at least 6 characters long'],
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            validator:function(el){
                return el === this.password
            },
            message:'Passwords are not the same'
        }
    },
    PhoneNumber:{
        type:String,
        required:[true,'Please enter your phone number'],
        match:[/^[0-9]{10}$/,'Please enter a valid phone number']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})