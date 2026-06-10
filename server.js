//used to start the server

const app=require("./app")

const connectDatabase=require("./config/database")

const dotenv=require("dotenv");

//load the env variables from config.env file
dotenv.config({path: "./config/config.env"})

//connect to database
connectDatabase();

//start the server
PORT=process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
}) 