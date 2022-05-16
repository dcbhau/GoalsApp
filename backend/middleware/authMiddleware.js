const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")


const protected = asyncHandler( async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            //get token from the headers
            token = req.headers.authorization.split(' ')[1];

            //jwt verify
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            //get User form token
            req.user = await User.findById(decoded.id).select('-password')
            next()

        }
        catch(error){
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token)
    {
        res.status(401) 
        throw new Error('Not authorized, No token')
    }
})

module.exports = {protected}