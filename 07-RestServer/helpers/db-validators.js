const Role = require('../models/role.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/products.model');
const isValidRole = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error('Role not valid');
    }

}
const validateEmailAlreadyRegister = async(email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error('Email Already exist');
    }
}
const existUserById = async(id = '') => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`User with id: ${id} no exist`);
    }
}
const categoryExist = async(id = '') => {
    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
        throw new Error(`Category with id: ${id} no exist`);
    }
}
const productExist = async(id = '') => {

    const productExist = await Product.findById(id);
    if (!productExist) {
        throw new Error(`Product with id: ${id} no exist`);
    }
}
const allowedCollections = async(collection = '', collections) => {
    if (!collections.includes(collection)) {
        throw new Error(`Collection ${collection} not allowed collection allow: ${collections}`);
    }
    return true;
}
module.exports = {
    isValidRole,
    validateEmailAlreadyRegister,
    existUserById,
    categoryExist,
    productExist,
    allowedCollections
}