//used to start the server

const app=require("./app")

const dotenv=require("dotenv");

//load the env variables from config.env file
dotenv.config({path: "./config/config.env"})

//start the server
PORT=process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})