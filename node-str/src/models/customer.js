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
    active: {
        type: Boolean,
        required: [true, 'O campo ativo é obrigatório'],
        default: true
    }
})

module.exports = mongoose.model('Customer', schema);