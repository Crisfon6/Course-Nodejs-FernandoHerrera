const Product = require('../models/products.model');
const { request, response } = require('express');

const getAllProducts = async(req = request, res = response) => {


    const { limit = 5, from = 0 } = req.query;

    const query = { state: true }
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });
}
const getProductById = async(req = request, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate('user', 'name');
    res.json({
        product
    });
}
const createProduct = async(req = request, res = response) => {
    let { name, ...data } = req.body;
    data.name = name.toUpperCase();
    data.user = req.user._id;
    const productfound = await Product.findOne({ name: data.name });
    if (productfound) {
        return res.json({
            msg: 'Product already exist'
        })
    }
    const product = new Product(data);

    await product.save();
    res.json({
        product
    });
}
const updateProduct = async(req = request, res = response) => {
    let { state, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const { id } = req.params;
    const productByName = await Product.findOne({ name: data.name });

    if (productByName) {
        return res.status(400).json({
            msg: 'name product already in use'
        });
    }
    const product = await Product.findByIdAndUpdate(id, data);


    res.json({
        product,

    });
}
const deleteProduct = async(req = request, res = response) => {

    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { state: false });
    res.json({
        product
    });
}
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct

};