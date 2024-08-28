const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
require('dotenv').config()

const isLoggin = async(req, res, next)=>{
    let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded = jwt.verify(token, process.env.jwt_secret);
			req.user = await User.findById(decoded.userId).select('-password');
			if (!req.user) throw new Error('Not authorized');
		} catch (error) {
			console.log(error);
			return res
				.status(401)
				.json({status: false, message: error.message});
		}
	}
	if (!token) {
		return res
			.status(401)
			.json({status: false, message: 'Not authorized, no token'});
	}
	next();
}


const isAdmin = (req, res, next)=>{
    if(!req.user){
        return res.status(401).json({error: "not autorized, please try to log in"})
    }
    if(req.user.role !== "admin"){
        return res.status(401).json({error: "not autorized, you are not an admin"})
    }

	next()


}



module.exports ={isLoggin, isAdmin}