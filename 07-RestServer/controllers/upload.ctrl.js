const { response } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const loadFile = async(req, res = response) => {
    try {

        // const name = await uploadFile(req.files, ['txt', 'md'], 'txts');
        const name = await uploadFile(req.files, undefined, 'imgs');
        res.status(200).json({
            name

        });

    } catch (err) {
        res.status(400).json({ msg: err })
    }



}

const updatePhoto = async(req, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `no exist a user with id: ${id}`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `no exist a product with id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: 'i forget implement this'
            })
    }
    //clean preview images
    try {
        if (model.img) {
            //if this image exist on the server
            const pathImage = path.join(__dirname, '../uploads', collection, model.img);
            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }
    } catch (err) {
        res.status(500).json({ err })
    }


    try {


        // const name = await uploadFile(req.files, ['txt', 'md'], 'txts');
        const name = await uploadFile(req.files, undefined, collection);
        model.img = name;
        await model.save()
        res.status(200).json({
            model

        });

    } catch (err) {
        res.status(400).json({ msg: err })
    }
}

const showImage = async(req, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `no exist a user with id: ${id}`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `no exist a product with id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: 'i forget implement this'
            })
    }
    if (model.img) {
        //if this image exist on the server
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }
    const pathImage = path.join(__dirname, '../assets', 'no-image.jpg');
    return res.sendFile(
        pathImage
    );
}
const updatePhotoCloudDinary = async(req, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `no exist a user with id: ${id}`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `no exist a product with id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: 'i forget implement this'
            })
    }
    //clean preview images

    if (model.img) {
        //if this image exist on the server
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        console.log(public_id);
        cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(
        tempFilePath
    );
    model.img = secure_url;
    await model.save()
    res.status(200).json({
        model

    });


}
module.exports = {
    loadFile,
    updatePhoto,
    showImage,
    updatePhotoCloudDinary
}