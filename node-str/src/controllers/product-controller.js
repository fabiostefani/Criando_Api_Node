/* eslint-disable no-undef */
'use strict'

//const ValidationContract = require('../validators/base/fluent-validador');
const ValidatorProduct = require('../validators/product-validador');
const repository = require('../repositories/product-repository');

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

    // var product = new Product();
    // product.title = req.body.title;
    // ...product...
    // product.save();

    let contract = ValidatorProduct.validateCreate(req.body);
    // let contract = new ValidationContract();
    // contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    // contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    // contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');
    // contract.isRequired(req.body.tags, 'Obrigatório informar as TAGS');
    // contract.isGreaterThan(req.body.price, 0, 'O preço deve ser superior a zero');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
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