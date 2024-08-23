const userModel = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const register = async(req,res)=>{
    const {email, password , username, confirmPassword} = req.body
    if(!email || !password || !username || !confirmPassword){
       return res.status(401).json({error: "fill all credentials before registering"})
    }  
    if(password !== confirmPassword){
       return res.status(400).json({error: "password and confirm password does not match"})
    }
    const findRegisteredAcct = await userModel.findOne({email})
    if(findRegisteredAcct){
       return res.status(401).json({error: "user with this email address already exist"})
    }
     // hash and salt password
     const salt = bcrypt.genSaltSync(10);
     const hashedPassword = bcrypt.hashSync(password, salt);
    // register new user
    const registerUser = await userModel.create({email, password: hashedPassword, username, confirmPassword})
   
    if(!registerUser){
       return res.status(401).json({error: "unable to signUp"})
    }
    res.status(201).json({message: "registered successfully", registerUser})

}

const login = async(req,res)=>{
    const {password, email} = req.body
    if(!password || !email){
        res.status(401).json({error: "input password and email to signup"})
    }
    const registeredUser =  await userModel.findOne({email})
    if(!registeredUser){
       return res.status(404).json({error: "user with this email does not exist"})
    }

    const checkPassword = bcrypt.compareSync(password, registeredUser.password);
    if(!checkPassword){
        res.status(404).json({error: "password is incorrect"})
    }
    const token = jwt.sign({ userId: registeredUser._id }, process.env.jwt_secret , { expiresIn: '1h' });
    res.json({message: "registered succesfully", token})

}
module.exports = {register, login}