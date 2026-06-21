const catchAsynchErrors = require("../middlewares/catchAsyncErrors")

const dotenv = require("dotenv")

dotenv.config({path:"./config/config.env"})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
console.log("KEY",process.env.STRIPE_SECRET_KEY)

//process payment api

exports.processPayment = catchAsynchErrors(async(req,res,next)=>{
    console.log(req.body)

    //create a stripe checkout session
    const session = await stripe.checkout.sessions.create({
        customer_email: req.user.email,
        phone_number_collection:{
            enable:true
        },
        line_items:req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.foodItem.name,
                    images:[item.foodItem.images[0].url],
                },
                unit_amount: item.foodItem.price * 100
            },
            quantity:item.quantity

        })),

        mode:"payment",
        shipping_address_collection:{
            allowed_countries:["US","IN"]
        },
        shipping_options:[
            {
                shipping_rate_date:{
                    display_name:"Delivery charges",
                    type:"fixed_amount",
                    fixed_amount:{
                        amount:5500,
                        currency:"inr"
                    },
                    delivery_estimate:{
                        minimum:{
                            unit:"hour",
                            value:1
                        },
                        maximum:{
                            unit:"hours",
                            value:3
                        }
                    }
                }
            }
        ],
        success_url:`${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${process.env.FRONTEND_URL}/cart`

    });
    res.status(200).json({url:session.url})
})

//send strip api key

exports.sendStripeApi= catchAsynchErrors(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})

