
const ErrorHandler=require("../utils/errorHandler")
const catchAsyncErrors=require("../middlewares/catchAsyncErrors")
const APIFeatures=require("../utils/apiFeatures")
const Restaurant=require("../models/restaurant")

//get all restaurants
exports.getAllRestaurants=catchAsyncErrors(async(req,res,next)=>{
    const apiFeartures = new APIFeatures(Restaurant.find(), req.query).search().sort()

    const restaurants = await apiFeartures.query

    res.status(200).json({
        success:true,
        count:restaurants.length,
        restaurant:restaurants
    })
})