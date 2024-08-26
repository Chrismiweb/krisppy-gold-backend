const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
require('dotenv').config()

const isLoggin = async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startWith('bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.jwt_secret);
            req.user = await userModel.findById(decoded.userId);
            if(!req.user){
                return res.status(401).json({error: "not authorized, pls login"});
            }
        } catch (error) {
            console.log(error.message)
            return res.status(403).json({error:"Invalid token"});
        }
    }
}


const isAdmin = ()=>{
    if(!req.user){
        return res.status(401).json({error: "not autorized, please try to log in"})
    }
    if(req.user.role !== "admin"){
        return res.status(401).json({error: "not autorized, you are not an admin"})
    }
}



module.exports ={isLoggin, isAdmin}