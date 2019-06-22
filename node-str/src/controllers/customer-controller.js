/* eslint-disable no-undef */
'use strict'

const ValidationContract = require('../validators/fluent-validador');
const repository = require('../repositories/customer-repository');

function retStatusCode200 (res, data){
      res.status(200).send(data);
}

function retStatusCode201 (res, msg){
    res.status(200).send({
        message: msg
    });
}


// function retStatusCode400(res, erro){
//     res.status(400).send({
//         message: 'Falha ao processar a requisição',
//         error: erro
//     });
// }

exports.get = async (req, res, next) => {
    try{
        var data = await repository.get();
        //res.status(200).send(data);
        retStatusCode200(res, data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição',
            error: e
        });
    }    
}

exports.getById = async (req, res, next) => {
    try{
        var data = await repository.getById(req.params.id);
        //res.status(200).send(data);
        retStatusCode200(res, data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição',
            error: e
        });
    }    
}

exports.getByName = async(req, res, next) => {
    try{
        var data = await repository.getByName(req.params.name);
        retStatusCode200(res, data);        
    }catch (e){        
        res.status(400).send({
            message: 'Falha ao processar a requisição',
            error: erro
        });
    }    
}

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 6 caracteres');
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        retStatusCode201(res, 'Cliente cadastrado com sucesso');        
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
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 6 caracteres');
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.update(req.params.id, req.body);
        retStatusCode200(res, {
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
        retStatusCode200(res, {
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
        retStatusCode200(res, {
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
        retStatusCode200(res, {
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