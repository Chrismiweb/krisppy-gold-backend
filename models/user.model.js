const { Schema, model } = require("mongoose");

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
    role: {
        type: String,
        enum: ['admin', 'user', 'seller'],
        default: "user"

    }


})
const userModel = model('user', userSchema)

module.exports = userModel
