const mongoose = require('mongoose')
require("dotenv").config()


// connection string
const connectString = process.env.connectString
async function connectDb(){
    mongoose.connect(connectString)
    console.log("database connected");
    
}

module.exports = {connectDb}