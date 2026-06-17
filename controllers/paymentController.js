const catchAsynchErrors = require("../middlewares/catchAsyncErrors")

const dotenv = require("dotenv")

dotenv.config({path:"./config/config.env"})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
console.log("KEY",process.env.STRIPE_SECRET_KEY)

//process payment api

exports.processPayment = catchAsynchErrors(async(req,res,next)=>{
    console.log(req.body)

    //create a stripe checkout session
    const session = await stripe.checkout.create({
        
    })
})

