const jwt = require('jsonwebtoken');
const {response,request} = require('express');
const User = require('../models/user.model');

const validateJWT = async (req=request,res=response,next) =>{
    const token = req.header('x-token');
    if( !token){
        return res.status(401).json({
            msg: 'Token is mandatory'
        });
    }
    try{
        const {uid} = jwt.verify(token,process.env.SECRETPRIVATEKEY);
        
      
            const user = await User.findById(uid);

            if (!user){
                return res.status(404).json({
                    msg: 'User Not Found'
                });
            }
            
            //validate state user
            if (!user.state){
                return res.status(401).json({
                    mgs: 'No valid Token'
                });
            }
            req.user = user;


           

        
        next();
    }catch{
        return res.status(401).json({
            msg: "Token isn't valide"
        });
    }
    
};

module.exports = {
    validateJWT
};   