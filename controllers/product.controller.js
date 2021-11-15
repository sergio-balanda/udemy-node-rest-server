const { response } = require('express');
const { Product, Category } = require('../models');

const get = async (req, res = response) => {

    const {limit = 5, from = 0 } = req.query
    const query = { state: true }

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .limit(Number(limit))
        .skip(Number(from))
    ])

    res.status(200).json({
        products,
        total
    });
}

const getById = async (req, res = response) => {

    const { id } = req.params
    const product = await Product.findOne({id})
    .populate('user')
    .populate('category')

    res.status(200).json({
        product
    });
}

const post = async (req, res = response) => {

    const { 
        name, 
        description, 
        state, 
        price = 0,
        available, 
        category_id 
    } = req.body


    const data = {
        name,
        description, 
        state,
        price,
        available,
        user: req.user._id,
        category: category_id 
    }

    try {
        const product = new Product(data)
        await product.save()
        res.status(201).json({
            product
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        });
    }
}

const put = async (req, res = response) => {


    res.status(200).json({
        
    });
}

const deleteProduct = async (req, res = response) => {

    const {id} = req.params
    const product = await Product
    .findByIdAndUpdate(id, {state:false},{new:true})
    res.status(200).json({
        product
    });
}

module.exports = {
    get,
    getById,
    post,
    put,
    deleteProduct
}