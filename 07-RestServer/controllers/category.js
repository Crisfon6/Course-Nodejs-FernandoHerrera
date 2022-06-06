const Category = require('../models/category.model');
const { request, response } = require('express');

const getAllCategory = async(req = request, res = response) => {


    const { limit = 5, from = 0 } = req.query;

    const query = { state: true }
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate('user', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });
}
const getCategoryById = async(req = request, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id)
        .populate('user', 'name');
    res.json({
        category
    });
}
const createCategory = async(req = request, res = response) => {
    let { name } = req.body;
    name = name.toUpperCase();
    const categoryfound = await Category.findOne({ name });
    if (categoryfound) {
        return res.json({
            msg: 'Category already exist'
        })
    }
    const data = {
        name,
        user: req.user._id
    }
    const category = new Category(data);

    await category.save();
    res.json({
        category
    });
}
const updateCategory = async(req = request, res = response) => {
    let { state, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, data);

    res.json({
        category
    });
}
const deleteCategory = async(req = request, res = response) => {

    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { state: false });
    res.json({
        category
    });
}
module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory

};