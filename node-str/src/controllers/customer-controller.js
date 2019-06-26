/* eslint-disable no-undef */
'use strict'

const ValidatioCustomer = require('../validators/customer-validador');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/infra/email-service');
const authService  =require('../services/infra/auth-service');

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

exports.authenticate = async(req, res, next) => {
    try{
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name
        });

        res.status(201).send( {
          token: token,
          data: {
              email: customer.email,
              name: customer.name
          }  
        })
    }catch (e){        
        res.status(400).send({
            message: 'Falha ao processar a requisição',
            error: erro
        });
    }    
}


exports.post = async(req, res, next) => {
    let contract = ValidatioCustomer.validar(req.body);
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(
            req.body.email, 
            'Bem vindo ao fabiostefani.io', 
            global.EMAIL_TMPL.replace('{0}', req.body.name));

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
    let contract =  ValidatioCustomer.validar(req.body);
        
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

exports.sendEmail = async(req, res, next) => {
    
    try {
        emailService.send(
            req.body.email, 
            'Bem vindo ao fabiostefani.io', 
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        retStatusCode201(res, 'E-mail enviado com sucesso');        
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o cliente',
            data: req.body,
            error: e
        })
    }
}