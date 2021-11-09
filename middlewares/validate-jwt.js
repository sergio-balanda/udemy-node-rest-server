const { response, request} = require('express')
const jwt = require("jsonwebtoken")
const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg:'invalid token'
        })
    }

    try {
        // @ts-ignore
        const { uid } = jwt.verify(token,process.env.SECRET)
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg:'invalid user'
            })
        }

        if(!user.state){
            return res.status(401).json({
                msg:'invalid token'
            })
        }

        // @ts-ignore
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'invalid token'
        })
    }
}

module.exports = {
    validateJWT
}