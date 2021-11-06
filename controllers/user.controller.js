const { response } = require('express')

const get = (req, res = response) => {
    const { page, order, q = 'no query' } = req.query

    res.status(200).json({
        message: "get API - controller",
        page,
        order,
        q
    });
}

const post = (req, res = response) => {
    const { name, id } = req.body
    res.status(200).json({
        message: "post API - controller",
        name,
        id,
    });
}

const put = (req, res = response) => {
    const { id } = req.params
    res.status(200).json({
        message: "put API - controller",
        id
    });
}

const deleteUser = (req, res = response) => {
    res.status(200).json({
        message: "delete API - controller"
    });
}

module.exports = {
    get,
    post,
    put,
    deleteUser
}