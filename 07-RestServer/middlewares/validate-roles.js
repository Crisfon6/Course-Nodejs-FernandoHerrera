const { response } = require("express")

const isAdminRole = (req,res=response,next)=>{
    
    if(!req.user){
        return res.status(500).json({
            msg: 'You need validate token before of validate role'
        });
    }
    if(req.user.role!='ADMIN_ROLE'){
        return res.status(401).json({
            msg: `user : ${req.user.name} isn't admin`
        });
    }
    next();
}


const haveRole  = (...roles)=>{
    
    return (req,res=response,next)=>{
        if(!req.user){
            return res.status(500).json({
                msg: 'You need validate token before of validate role'
            });
        }
        if(!roles.includes(req.user.role )){
            return res.status(401).json({
                msg: `The service need somoe of this roles ${roles}`
            });
        }
        
        next();
    }
}
module.exports =  {
    isAdminRole,
    haveRole
}