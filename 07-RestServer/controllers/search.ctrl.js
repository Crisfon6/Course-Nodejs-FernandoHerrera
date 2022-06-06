const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/products.model');
const Role = require('../models/role.model');

const allowCollections = [
    "users",
    "roles",
    "products",
    "categories"
];

const searchUser = async(mean = '', res = response) => {

    const isMongoId = ObjectId.isValid(mean);
    if (isMongoId) {
        const user = await User.findById(mean);
        return res.json({
            results: (user) ? [user] : []
        })
    }
    const regex = new RegExp(mean, 'i');

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    return res.status(400).json({
        results: users
    });
}
const searchProduct = async(mean = '', res = response) => {

    const isMongoId = ObjectId.isValid(mean);
    if (isMongoId) {
        const product = await Product.findById(mean);
        return res.json({
            results: (product) ? [product] : []
        })
    }
    const regex = new RegExp(mean, 'i');

    const products = await Product.find({
        name: regex,
        $and: [{ state: true }]

    });

    return res.status(400).json({
        results: products
    });
}
const searchCategories = async(mean = '', res = response) => {

    const isMongoId = ObjectId.isValid(mean);
    if (isMongoId) {
        const categories = await Category.findById(mean);
        return res.json({
            results: (categories) ? [categories] : []
        })
    }
    const regex = new RegExp(mean, 'i');

    const categories = await Category.find({
        name: regex,

    });

    return res.status(400).json({
        results: categories
    });
}

const search = (req, res = response) => {
    const { collection, mean, ...another } = req.params;
    if (!allowCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Collection no allowed: ${collection}`
        });
    }

    switch (collection) {
        case 'users':
            console.log('users');
            searchUser(mean, res);
            break;
        case "products":
            searchProduct(mean, res);
            break;
        case "categories":
            searchCategories(mean, res);
            break;
        default:
            res.status(500).json({
                msg: 'I forget implement this'
            });
    }

}
module.exports = {
    search
}