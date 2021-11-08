const { Schema, model } = require('mongoose');

// @ts-ignore
const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El campo es requerido'],
    },
    email:{
        type: String,
        required: [true, 'El campo es requerido'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'El campo es requerido'],
    },
    image:{
        type: String,
    },
    rol:{
        type: String,
        required: [true, 'El campo es requerido'],
        enum:['ADMIN','USER']
    },
    state:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
})    

UserSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject()
    return user
}

module.exports = model('Users', UserSchema)