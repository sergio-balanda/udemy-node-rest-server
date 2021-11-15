const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Product, Category, User } = require('../models');

const colleccions = [
    'users',
    'products',
    'categories',
    'rols'
]

const searchUser = async (field, res = response) => {
    const isMongoId = ObjectId.isValid(field)

    if(isMongoId) {
        const user = await User.findById(field)
        res.status(200).json({
            results: user ? [user] : []
        })
    }

    const regex = new RegExp(field,'i')
    const user = await User
        .find({
            $or: [{name:regex},{email:regex}],
            $and: [{state:true}]
        })

    res.status(200).json({
        results: user ? [user] : []
    })
}

const get = async (req, res = response) => {

    const {colleccion , field } = req.params
    if(!colleccions.includes(colleccion)){
        res.status(400).json({
            msg:'Invallid collection'
        });
    }

    switch(colleccion){
        case 'users':
            await searchUser(field,res)
            break;
        case 'products':
            break
        case 'categories':
            break
        default:
            res.status(500).json({
                msg:'Invallid collection'
            })
    }


}


module.exports = {
    get
}