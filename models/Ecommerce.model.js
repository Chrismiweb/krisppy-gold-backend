const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

const ecommerceSchema = new Schema({
    image: {
        type: String,
        // require: true
    },
    productName: {
        type: String,
        require: true
    },
    productDescription: {
        type: String,
        require: true
    },
    productPrice: {
        type: Number,
        require: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        require: true
    }
})

const ecommerceModel = new model('ecommerce', ecommerceSchema)

module.exports = {ecommerceModel}