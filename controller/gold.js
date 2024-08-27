const { ecommerceModel } = require("../models/Ecommerce.model");
const path = require('path');
const fs = require('fs');
const userModel = require("../models/User.model");


// uploading the product
const uploadGold = async (req, res) => {

    try {
      const { productName, productDescription, productPrice } = req.body;
  
      // Validate required fields
      if (!productName || !productDescription || !productPrice) {
        return res.status(400).json({ error: "Please fill all credentials" });
      }
  
      // Check if files were uploaded
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
  
      console.log('req.files >>>', req.files); 
  
      const blogFile = req.files.image;
      const uploadsDir = path.join(__dirname, '../uploads/');
  
      // Create the uploads directory if it doesn't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }
  
      // Generate a unique filename using Date.now()
      const fileName = `${Date.now()}-${blogFile.name}`;
      const uploadPath = path.join(uploadsDir, fileName);
  
      // Move the file to the upload directory
      blogFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
  
      // Create a new product in the database
      const createPost = new ecommerceModel({
        productName,
        productDescription,
        productPrice,
        image: fileName,
        owner:req.user._id
      });
  
      if (!createPost) {
        return res.status(500).json({ error: "Your product was not created" });
      }

      await createPost.save()
  
      return res.status(201).json({ message: "Product was uploaded successfully", createPost });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: "An error occurred while uploading the product" });
    }
  };
  

// get one gold product using productName
const getOneGold = async(req,res)=>{
    try {
        const {productName} = req.params

        const getProduct = await ecommerceModel.findOne({productName})

        if(!getProduct){
        return res.json({error: "the product you searched for is not available"})
        }

        let user = getProduct.owner;
        let owner = await userModel.findById(user);
        let goldOwner;
        if(!owner){
            goldOwner = "Gues User"
        }
        goldOwner = owner.username;

    // res.status(200).json({productName:getProduct.productName, productDescription:getProduct.productDescription, productPrice: getProduct.productPrice, image:getProduct.image, owner:goldOwner})
    res.status(200).json({...getProduct._doc, owner:goldOwner})
    } catch (error) {
        console.log(error.message);
        
    }
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
    const deleteAllGold = async(req, res)=>{
       
        const deleteProduct = await ecommerceModel.deleteMany()
        if(!deleteProduct){
         return res.status(400).json({error: "unable to delete all product"})
 
        }
        res.status(200).json({message: "all product was deleted successfully"})
     }

module.exports = {uploadGold, getOneGold, getAllGold, updateGold, deleteOneGold, deleteAllGold}