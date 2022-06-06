const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


const usuariosGet = async(req = request, res = response) => {
    const {limit=5,from=0}  =req.query;
    const query  ={state:true};
    
    const [total,users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);
    
    res.json({
    total,
    users
    });
}

const usuariosPost = async (req, res = response) => {
   
    
    const { name, password,email,role } = req.body;

    const user = new User({ name, password,email,role });

    //verify email exist
    

    //encryp password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt);
    
    //save
    await user.save();
    

    res.json({
        user        
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const {_id, password, google,email ,...userData } = req.body;
    if (password){
        //encrypt password
        const salt = bcrypt.genSaltSync();
        userData.password = bcrypt.hashSync( password, salt);
    }
    const user = await User.findByIdAndUpdate(id,userData);

    res.json({
        user
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {        
    const idUserDelete = req.params.id;    
    const userDeleted = await User.findByIdAndUpdate(idUserDelete,{state:false})
    
    res.json({
        
        userDeleted
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}