const { ecommerceModel } = require("../models/Ecommerce.model");
const express =  require('express')
// const fileUpload = require('../lib/index');
const bodyParser = require('body-parser')
// file upload for images
const fileUpload =  require("express-fileupload")
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use express
app.use(express.json())

// use express file upload 
app.use(fileUpload())


// uploading the product
const uploadGold = async(req, res)=>{
      const {productName, productDescription, productPrice} = req.body
      if(!productName || !productDescription || !productPrice){
        res.status(400).json({error: "please fill all credentials"})
      }

        // uploading images
      
        // let blogFile;
        // let uploadPath;
        // let fileName;
    
        // if (!req.files || Object.keys(req.files).length === 0) {
        //     res.status(400).send('No files were uploaded.');
        //     return;
        //   }
        //   console.log('req.files >>>', req.files); // eslint-disable-line
    
        //     blogFile = req.files.image;
        //     // file name with date (this is optional and not neccessary)
            
        //     uploadPath = __dirname + '/uploads/' + blogFile.name;

        //     fileName = '/uploads/' + new Date().getTimezoneOffset() + blogFile.name;
    
        //     blogFile.mv(uploadPath, function(err) {
        //         if (err) {
        //             return res.status(500).send(err);
        //             }
        //     })

        const createPost =  await ecommerceModel.create({ productName, productDescription, productPrice})

        // if(!createPost){
        // return res.status(201).json({error: "your product was not created"})
        // }

        return res.status(200).json({message: "product was uploaded successfully", createPost})
   
}

// get one gold product using productName
const getOneGold = async(req,res)=>{
    const {productName} = req.params

    const getProduct = await ecommerceModel.findOne({productName})

    if(!getProduct){
       return res.json({error: "the product you searched for is not available"})
    }

    res.status(200).json({getProduct})
}


// get all gold product
    const getAllGold = async(req,res)=>{
        const getAll = await ecommerceModel.find()
        if(!getAll){
           return res.status(400).status({error: "unable to get all product"})
        }
        res.status(200).json({getAll})
    }


    // update a product already uploaded
    const updateGold = async(req, res)=>{
        const {productName} = req.params
        const findProduct = await ecommerceModel.findOne({productName})
        if(!findProduct){
            res.status(400).json({error: "this product does not exist"})
        }
        const updateProduct = await ecommerceModel.findOneAndUpdate({productName}, req.body, {runValidator: true, new:true})
        if(!updateProduct){
            return res.status(400).json({error: "unable to update this product"}, req.body, {runValidator: true, new:true})
        }
        res.status(200).json({message: "updated successfully", updateProduct})
    }


    // delete one product
    const deleteOneGold = async(req, res)=>{
       const {productName} =req.params
       const findProduct = await ecommerceModel.findOne({productName})
       if(!findProduct){
           res.status(400).json({error: "this product does not exist"})
       }
       const deleteProduct = await ecommerceModel.findOneAndDelete({productName})
       if(!deleteProduct){
        return res.status(400).json({error: "unable to delete this product"})

       }
       res.status(200).json({message: "this product was deleted successfully"})
    }


    // delete all product uploaded
    // const deleteAllGold = async(req, res)=>{
       
    //     const deleteProduct = await ecommerceModel.findAndDelete()
    //     if(!deleteProduct){
    //      return res.status(400).json({error: "unable to delete all product"})
 
    //     }
    //     res.status(200).json({message: "all product was deleted successfully"})
    //  }

module.exports = {uploadGold, getOneGold, getAllGold, updateGold, deleteOneGold}