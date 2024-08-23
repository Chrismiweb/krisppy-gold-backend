const { Schema, model } = require("mongoose");

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
    // owner: {
    //     type: mongoose.Type.ObjectId,
    //     ref: "user",
    //     require: true
    // }
})

const ecommerceModel = new model('ecommerce', ecommerceSchema)


module.exports = {ecommerceModel}