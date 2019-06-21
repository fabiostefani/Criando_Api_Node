/* eslint-disable no-undef */
'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const ValidationContract = require('../validators/fluent-validador');
const repository = require('../repositories/customer-repository');

exports.get = async (req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição',
            error: e
        });
    }    
}

// function retStatusCode200 (res, data){
//      res.status(200).send(data);
// }

// function retStatusCode400(res, erro){
//     res.status(400).send({
//         message: 'Falha ao processar a requisição',
//         error: erro
//     });
// }

exports.getByName = async(req, res, next) => {
    try{
        var data = await repository.getByName(req.params.name);
        //retStatusCode200(data);
        res.status(200).send(data);
    }catch (e){
        // retStatusCode400(res, e) ;
        res.status(400).send({
            message: 'Falha ao processar a requisição',
            error: erro
        });
    }    
}

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send({
            message: "Cliente cadastrado com sucesso"
        });
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o cliente',
            data: req.body,
            error: e
        })
    }
}

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Cliente atualizado com sucesso'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Erro atualizando o cliente',
            data: req.body,
            error: e
        })
    }    
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Cliente removido com sucesso'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Erro ao remover o cliente',
            error: e
        })
    }    
}

exports.inactivate = async(req, res, next) => {
    try {
        await repository.inactivate(req.params.id);
        res.status(200).send({
            message: 'Cliente inativado com sucesso'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Erro inativando o cliente',
            data: req.body,
            error: e
        })
    }    
}

exports.activate = async(req, res, next) => {
    try {
        await repository.activate(req.params.id);
        res.status(200).send({
            message: 'Cliente ativado com sucesso'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Erro ativando o cliente',
            data: req.body,
            error: e
        })
    }        
}