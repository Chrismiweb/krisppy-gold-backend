const mongoose = require('mongoose')
require("dotenv").config()


// connection string
const connectString = process.env.connectString
function connectDb(){
    mongoose.connect(connectString)
    console.log("database connected");
    
}

module.exports = {connectDb}