'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    const res = await Product.find({
                    active: true //APLICA O FILTRO PARA TRAZER SOMENTE OS PRODUTOS ATIVOS
                 }, 'title price slug'); //INDICA QUAIS COLUNAS DESEJO RETORNAR NA BUSCA
    return res;                 
           
}

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
                    slug: slug,
                    active: true 
                 }, 'title description price slug tags');
    return res;
}

exports.getById = async(id) => {
    const res = await Product.findById(id);
    return res;
           
}

exports.getByTag = async(tag) => {
    var res = await Product.find({
                    tags: tag,
                    active: true //APLICA O FILTRO PARA TRAZER SOMENTE OS PRODUTOS ATIVOS
                 }, 'title description price slug tags');
    return res;
}

exports.create = async(data) => {
    var product = new Product(data);
    await product.save();    
}

exports.update = async(id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {                                 //$set faz a atualização do produto, define o que vai ser atualizado
            title: data.title,
            description: data.description,
            price: data.price
        }
    })
}

exports.delete = async(id) => {
    await Product.findByIdAndDelete(id);    
}