const { Schema, model } = require("mongoose");
const { connectDb } = require("../database/connectDb");

const userSchema = new Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'seller'],
        default: "user"

    }


})
const userModel = new model('user', userSchema)

module.exports = userModel
