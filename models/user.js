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
    phoneNumber:{
        type:String,
        required:[true,'Please enter your phone number'],
        match:[/^[0-9]{10}$/,'Please enter a valid phone number']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    avatar:{
        public_id:String,
        url:String
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date


},
{timestamps:true}
);

//hash password
//pre("save")=> runs before data is saved

userSchema.pre('save',async function(){
    if(!this.isModified("password")) return;
    this.password=await bcrypt.hash(this.password,10)
    this.passwordConfirm=undefined

})

//password compare at login time

userSchema.methods.correctPassword=async function(
    candidatePassword, userPassword
){
    return await bcrypt.compare(candidatePassword,userPassword)
}
//checks whether the user's password was changed after the token was issued
//if yes, the old token is invalid and user must log in again
userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp=parseInt(
            this.passwordChangedAt.getTime()/1000,10
        )
        return JWTTimestamp < changedTimestamp
    }
    return false;
}

//coustomer method to generate password reset token

userSchema.methods.getJWTToken=function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES}
    )
}

module.exports=mongoose.model("User",userSchema)