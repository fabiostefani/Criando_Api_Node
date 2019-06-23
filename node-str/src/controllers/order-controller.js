/* eslint-disable no-undef */
'use strict'

const ValidationOrder = require('../validators/order-validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');

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

exports.getByNumber = async (req, res, next) => {
    try{
        var data = await repository.getByNumber(req.params.number);
        //res.status(200).send(data);
        retStatusCode200(res, data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar a requisição',
            error: e
        });
    }    
}

exports.post = async(req, res, next) => {
    let data = {
        customer: req.body.customer,
        number: guid.raw().substring(0, 6),
        items: req.body.items
    };
    
    let contract = ValidationOrder.validateCreate(data);
    // contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    // contract.isEmail(req.body.email, 'E-mail inválido');
    // contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 6 caracteres');
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.create(data);
        retStatusCode201(res, 'Pedido cadastrado com sucesso');        
    } catch (e) {
        res.status(400).send({
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
        retStatusCode200(res, {
            message: 'Pedido removido com sucesso'
        });        
    } catch (e) {
        res.status(400).send({
            message: 'Erro ao remover o pedido',
            error: e
        })
    }    
}