const { Schema, model } = require('mongoose');

// @ts-ignore
const RolSchema = Schema({
    rol:{
        type: String,
        required: [true, 'El campo es requerido'],
    },
})

module.exports = model('Rols', RolSchema)