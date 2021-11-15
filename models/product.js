const { Schema, model } = require('mongoose');

// @ts-ignore
const ProductSchema = Schema({
    name:{
        type: String,
        required: [true, "El campo name es requerido"],
        unique: [true, 'Campo duplicado']
    },
    description:{ type: String },
    available:{ type: Boolean, default: true},
    state:{
        type: Boolean,
        default: true,
        required: [true, "El campo state es requerido"]
    },
    price:{
        type: Number,
        default:0
    },
    user:{
        // @ts-ignore
        type: Schema.ObjectId,
        ref: 'Users',
        required: [true, "El campo user es requerido"]
    },
    category:{
        // @ts-ignore
        type: Schema.ObjectId,
        ref: 'Categories',
        required: [true, "El campo categoria es requerido"]
    }
})    

ProductSchema.methods.toJSON = function(){
    	const {__v, state, ...data} = this.toObject()
        return data
}

module.exports = model('Products', ProductSchema)