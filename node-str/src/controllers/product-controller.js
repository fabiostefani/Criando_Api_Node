/* eslint-disable no-undef */
'use strict'

//const ValidationContract = require('../validators/base/fluent-validador');
const ValidatorProduct = require('../validators/product-validador');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const config = require('../config');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e
        });
    }
}

exports.getById = async(req, res, next) => {

    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e
        });
    }               
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e
        });
    }           
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e
        });
    }             
}

exports.post = async(req, res, next) => {

    let contract = ValidatorProduct.validateCreate(req.body);    

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }




    try {
        const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        await blobSvc.createBlockBlobFromText('product-image', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.png'
            }
        })

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://cursonodejs.blob.core.windows.net/product-image/' + filename

        });
        res.status(201).send({
            message: 'Produto cadastrado com sucesso.'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e
        });
    }         
}

exports.put = async(req, res, next) => {
    
    let contract = ValidatorProduct.validateUpdate(req.body);
    // let contract = new ValidationContract();
    // contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');    
    // contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');
    // contract.isGreaterThan(req.body.price, 0, 'O preço deve ser superior a zero');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e
        });
    }         
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Produto removido com sucesso'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e
        });
    }             
}