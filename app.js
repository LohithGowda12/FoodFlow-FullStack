//configure express and middlewares
//import packages
//create express app
//  client->app->route->response
//configure middlewares
//export app

const express = require("express")
const app=express()

const auth=require("./routes/auth")
const restaurant=require("./routes/restaurant")


const cors=require("cors")

app.use(cors());   
app.use(express.json()
)
app.use("/api/v1/users", auth)
app.use("/api/v1/restaurants", restaurant)


module.exports=app