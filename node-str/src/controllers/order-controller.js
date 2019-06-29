/* eslint-disable no-undef */
'use strict'

const ValidationOrder = require('../validators/order-validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');
const autheService = require('../services/infra/auth-service');
const statusCode = require('../infra/retStatusCode');

exports.get = async (req, res, next) => {
    try{
        var data = await repository.get();
        statusCode.retSucesso(res, data);
    }catch(e){
        statusCode.retInternalServerError(res, {
            message: 'Falha ao processar a requisição',
            error: e
        });
    }    
}

exports.getById = async (req, res, next) => {
    try{
        var data = await repository.getById(req.params.id);
        statusCode.retSucesso(res,  data);
    }catch(e){
        statusCode.retInternalServerError(res, {
            message: 'Falha ao processar a requisição',
            error: e
        });
    }    
}

exports.getByNumber = async (req, res, next) => {
    try{
        var data = await repository.getByNumber(req.params.number);
        statusCode.retSucesso(res, data);
    }catch(e){
        statusCode.retInternalServerError(res, {
            message: 'Falha ao processar a requisição',
            error: e
        });
    }    
}

exports.post = async(req, res, next) => {
    const token = autheService.getTokenByRequest(req);//.body.token || req.query.token || req.headers['x-access-token'];
    const data = await autheService.decodeToken(token);
    
    let order = {
        customer: data.id,
        number: guid.raw().substring(0, 6),
        items: req.body.items
    };
    
    let contract = ValidationOrder.validateCreate(order);
    
    if (!contract.isValid()){
        statusCode.retErro(res,contract.errors()).end();
        return;
    }
    
    try {
        await repository.create(order);
        statusCode.retCreated(res, 'Pedido cadastrado com sucesso');        
    } catch (e) {
        statusCode.retErro(res,{
            message: 'Falha ao cadastrar o pedido',
            data: req.body,
            error: e
        })
    }
}

// exports.put = async(req, res, next) => {
//     let contract = new ValidationContract();
//     contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
//     contract.isEmail(req.body.email, 'E-mail inválido');
//     contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 6 caracteres');
    
//     if (!contract.isValid()){
//         res.status(400).send(contract.errors()).end();
//         return;
//     }
    
//     try {
//         await repository.update(req.params.id, req.body);
//         retStatusCode200(res, {
//             message: 'Cliente atualizado com sucesso'
//         });        
//     } catch (e) {
//         res.status(400).send({
//             message: 'Erro atualizando o cliente',
//             data: req.body,
//             error: e
//         })
//     }    
// }

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        statusCode.retSucesso(res, {
            message: 'Pedido removido com sucesso'
        });        
    } catch (e) {
        statusCode.retErro(res, {
            message: 'Erro ao remover o pedido',
            error: e
        })
    }    
}