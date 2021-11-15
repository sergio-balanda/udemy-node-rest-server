const { response } = require('express');
const { Category } = require('../models');

const get = async (req, res = response) => {

    const {limit = 5, from = 0 } = req.query
    const query = { state: true }

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .limit(Number(limit))
        .skip(Number(from))
        .populate('user','name')
    ])

    res.status(200).json({
        categories,
        total
    });
}

const getById = async (req, res = response) => {
    const { id } = req.params
    const user = await Category.findOne({id}).populate('user')

    res.status(200).json({
        user
    });
}

const post = async (req, res = response) => {
    const name = req.body.name.toUpperCase();
    
    const categoryExists = await Category.findOne({name})

    if(categoryExists){
        res.status(400).json({
            msg: 'Category already exists'
        });
    }

    const data = {
        name,
        user: req.user._id
    }

    try {
        const category = new Category(data)
        await category.save()
        res.status(201).json({
            category
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }



}

const put = async (req, res = response) => {
    const { id } = req.params
    const { state, user, ...data } = req.body
    console.log(req.user);
    data.name = data.name.toUpperCase()
    data.user = req.user._id
    const category = await Category
    .findByIdAndUpdate(id, data,{new: true})

    res.status(200).json({
        category
    });
}

const deleteCategory = async (req, res = response) => {
    const {id} = req.params
    const category = await Category
    .findByIdAndUpdate(id, {state:false},{new:true})
    res.status(200).json({
        category
    });
}

module.exports = {
    get,
    getById,
    post,
    put,
    deleteCategory
}