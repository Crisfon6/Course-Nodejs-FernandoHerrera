const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        //verify if exist email
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                msg: 'user no found'
            });
        }


        //verfiy if user is active

        if (!user.state) {
            return res.json({
                msg: 'user /password wrong -state:false'
            });
        }

        //verify passwrod
        const validatePswd = bcrypt.compareSync(password, user.password);
        if (!validatePswd) {
            return res.json({
                msg: 'Password Wrong'
            });
        }

        //generate jwt
        const token = await generateJWT(user.id);

        res.json({
            token,
            user
        });
    } catch (error) {
        console.log(errorr)
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}





const loginGoogle = async(req = request, res = response, next) => {
    const { idtoken } = req.body;

    try {
        const { email, name, img } = await googleVerify(idtoken);
        //verify user exist

        let user = await User.findOne({ email });

        if (!user) {
            //create user
            const data = {
                name,
                email,
                password: ':)',
                img,
                google: true
            };
            user = new User(data)
            await user.save();
        } //else {
        //     return res.status(401).json({
        //         msg: 'User already exist'
        //     });
        // }

        // If the user in DB
        if (!user.state) {
            return res.status(401).json({
                msg: 'Contact with Admin user blocked'
            });
        }
        //generate jwt
        const token = await generateJWT(user.id);

        return res.json({
            token,
            msg: 'loged'
        });

        ;
    } catch (error) {
        return res.status(400).json({
            msg: 'Google token is invalid'
        })
    }

    // console.log('Login google');
    // console.log(req.body);
    // let login_data = await verify(req.body.idtoken)
    //     .catch(e => {
    //         return res.status(403).json({
    //             ok: false,
    //             err: e
    //         });
    //     });
    // User.findOne({ email: login_data.email }, (err, usuarioDB) => {
    //     if (err) {
    //         res.status(500).json({
    //             msg: 'Something went wrong'
    //         });
    //     };
    //     if (usuarioDB) {
    //         if (usuarioDB.google == false) {
    //             res.status(400).json({
    //                 msg: 'Something went wrong'
    //             });
    //         }
    //     }

    // });
    // res.json({
    //     user: login_data
    // });
}
module.exports = {
    login,
    loginGoogle
}