const { ecommerceModel } = require("../models/Ecommerce.model");
const express =  require('express')
// const fileUpload = require('../lib/index');
const bodyParser = require('body-parser')
// file upload for images
// const fileUpload =  require("express-fileupload")
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use express
app.use(express.json())

// use express file upload 
// app.use(fileUpload())

// use file upload

// uploading the product
const uploadGold = async(req, res)=>{
    try {
        const {productName, ProductDescription, ProductPrice} = req.body
        if(!productName, !ProductDescription, !ProductPrice){
            return res.status(201).json({error: "please fill all inputs "})
        }

        // uploading images
       
        const createPost =  new ecommerceModel({productName, ProductDescription, ProductPrice})

        if(!createPost){
        return res.status(201).json({error: "your product was not created"})
        }

        return res.status(200).json({message: "product was uploaded successfully", createPost})
    } catch (error) {
        console.log(error.message)
    }
}




module.exports = {uploadGold}