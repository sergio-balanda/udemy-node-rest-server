const { Schema, model } = require('mongoose');

// @ts-ignore
const CategorySchema = Schema({
    name:{
        type: String,
        required: [true, "El campo name es requerido"],
        unique: [true, 'Campo duplicado']
    },
    state:{
        type: Boolean,
        default: true,
        required: [true, "El campo state es requerido"]
    },
    user:{
        type: Schema.ObjectId,
        ref: 'Users',
        required: [true, "El campo user es requerido"]
    }
})    

CategorySchema.methods.toJSON = function(){
    	const {__v, state, ...data} = this.toObject()
        return data
}

module.exports = model('Categories', CategorySchema)