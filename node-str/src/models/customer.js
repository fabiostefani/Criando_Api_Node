'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {
        type: String,
        required: [true, 'O campo nome é obrigatório'],
        trim: true,
        unique: true        
    },
    email: {
        type: String,
        required: [true, 'O campo e-mail é obrigatório'],
        trim: true,
        unique: true        
    },
    password: {
        type: String,
        required: [true, 'O campo senha é obrigatório'],
        trim: true        
    },
    active: {
        type: Boolean,
        required: [true, 'O campo ativo é obrigatório'],
        default: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
})

module.exports = mongoose.model('Customer', schema);