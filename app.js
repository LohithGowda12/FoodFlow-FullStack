//configure express and middlewares
//import packages
//create express app
//  client->app->route->response
//configure middlewares
//export app

const express = require("express")
const app=express()
const cors=require("cors")   //used to import package

app.use(cors());   
app.use(express.json())

module.exports=app