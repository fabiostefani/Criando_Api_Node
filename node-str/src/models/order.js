'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
     customer: {
         type: mongoose.Schema.Types.ObjectId, //FORMA DE FAZER FK
         ref: 'Customer'
    },
    number: {
        type: String,
        required: true      
    },
    createdate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'], //EXEMPLO DE ENUM
        default: 'created'
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
    
})

module.exports = mongoose.model('Order', schema);