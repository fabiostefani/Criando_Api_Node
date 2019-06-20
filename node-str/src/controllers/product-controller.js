/* eslint-disable no-undef */
'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product.find({
                    active: true //APLICA O FILTRO PARA TRAZER SOMENTE OS PRODUTOS ATIVOS
                 }, 'title price slug') //INDICA QUAIS COLUNAS DESEJO RETORNAR NA BUSCA
           .then(data => {
                res.status(200).send(data);
            })
            .catch(e=>{
                res.status(400).send(e);
            })
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id) //INDICA QUAIS COLUNAS DESEJO RETORNAR NA BUSCA
           .then(data => {
                res.status(200).send(data);
            })
            .catch(e=>{
                res.status(400).send(e);
            })
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({
                    slug: req.params.slug,
                    active: true //APLICA O FILTRO PARA TRAZER SOMENTE OS PRODUTOS ATIVOS
                 }, 'title description price slug tags') //INDICA QUAIS COLUNAS DESEJO RETORNAR NA BUSCA
           .then(data => {
                res.status(200).send(data);
            })
            .catch(e=>{
                res.status(400).send(e);
            })
}

exports.getByTag = (req, res, next) => {
    Product.find({
                    tags: req.params.tag,
                    active: true //APLICA O FILTRO PARA TRAZER SOMENTE OS PRODUTOS ATIVOS
                 }, 'title description price slug tags') //INDICA QUAIS COLUNAS DESEJO RETORNAR NA BUSCA
           .then(data => {
                res.status(200).send(data);
            })
            .catch(e=>{
                res.status(400).send(e);
            })
}

exports.post = (req, res, next) => {

    // var product = new Product();
    // product.title = req.body.title;
    // ...product...
    // product.save();

    var product = new Product(req.body);
    product.save()
           .then(x => {
                res.status(201).send({
                    message: 'Produto cadastrado com sucesso.'
                });
           })
           .catch(e=>{
                res.status(400).send({
                    message: 'Falha ao cadastrar o produto.',
                    data: e
                });
           })
}

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {                                 //$set faz a atualização do produto, define o que vai ser atualizado
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar o produto',
            data: e
        });
    })
}

exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.body.id).then(x => {
        res.status(200).send({
            message: 'Produto removido com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover o produto',
            data: e
        });
    })
}