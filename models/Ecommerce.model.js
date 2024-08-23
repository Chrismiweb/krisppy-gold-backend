const { Schema, model } = require("mongoose");
const { connectDb } = require("../database/connectDb");

const ecommerceSchema = new Schema({
    image: {
        type: String,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    ProductDescription: {
        type: String,
        require: true
    },
    ProductPrice: {
        type: Number,
        require: true
    },
    owner: {
        type: mongoose.Type.ObjectId,
        ref: "user",
        require: true
    }
})

const ecommerceModel = new model('ecommerce', ecommerceSchema)


module.exports = {ecommerceModel}