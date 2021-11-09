const { response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const get = async (req, res = response) => {
    const { page, from, order, limit = 5, q = 'no query' } = req.query
    console.log("users ",req.uid)
    const [ total , users] = await Promise.all([
        User.find({state:true}).countDocuments({}),
        User.find({state:true})
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.status(200).json({
        users,
        total,
        page,
        order,
        q,
        from,
        limit    
    });
}

const post = async (req, res = response) => {
    const { name, email, password, rol } = req.body

    const salt = bcrypt.genSaltSync(10)

    const user = new User({
        name,
        email,
        password,
        rol
    })

    user.password = bcrypt.hashSync(password,salt)
    await user.save()

    res.status(200).json({
        user
    });
}

const put = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, email, ...rest } = req.body
    
    if(password){
        const salt = bcrypt.genSaltSync(10)
        rest.password = bcrypt.hashSync(password,salt)
    }

    const user = await User.findByIdAndUpdate(id, rest)
    
    res.status(200).json({
        user
    });
}

const deleteUser = async (req, res = response) => {
    const {id} = req.params
    // const user = await User.findByIdAndDelete(id)
    const user = await User.findByIdAndUpdate(id,{
        state:false
    })

    res.status(200).json({
        user
    });
}

module.exports = {
    get,
    post,
    put,
    deleteUser
}