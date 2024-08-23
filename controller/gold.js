const { ecommerceModel } = require("../models/Ecommerce.model");
const express =  require('express')
const fileUpload = require('../lib/index');
// file upload for images
// const fileUpload =  require("express-fileupload")
const app = express()


// use express
app.use(express.json())

// use express file upload 
app.use(fileUpload())

// use file upload

// uploading the product
const uploadGold = async(req, res)=>{
    const {productName, ProductDescription, ProductPrice} = req.body
    if(!productName, !ProductDescription, !ProductPrice){
        return res.status(201).json({error: "please fill all inputs "})
    }

    // uploading images
    let sampleFile;
    let uploadPath;
    let fileName;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    sampleFile = req.files.image;

    uploadPath = __dirname + '/uploads/' + sampleFile.name;

    fileName = '/uploads/' + new Date().getTimezoneOffset() + uploadPath.name

    sampleFile.mv(uploadPath, function(err) {
        if (err) {
        return res.status(500).send(err);
        }

    });

    const createPost = await new ecommerceModel({image: fileName, productName, ProductDescription, ProductPrice})

    if(!createPost){
       return res.status(201).json({error: "your product was not created"})
    }

    return res.status(200).json({message: "product was uploaded successfully"})
}




module.exports = {uploadGold}