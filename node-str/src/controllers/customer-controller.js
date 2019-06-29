/* eslint-disable no-undef */
'use strict'

const ValidatioCustomer = require('../validators/customer-validador');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/infra/email-service');
const authService = require('../services/infra/auth-service');
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
        statusCode.retSucesso(res, data);
    }catch(e){
        statusCode.retInternalServerError(res,{
            message: 'Falha ao processar a requisição',
            error: e
        });
    }    
}

exports.getByName = async(req, res, next) => {
    try{
        var data = await repository.getByName(req.params.name);
        statusCode.retSucesso(res, data);
    }catch (e){   
        statusCode.retErro(res, {
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
            statusCode.retNotFound(res, {
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        statusCode.retCreated(res, {
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });        
    }catch (e){        
        statusCode.retErro(res, {
            message: 'Falha ao processar a requisição',
            error: erro
        });
    }    
}

exports.refreshToken = async(req, res, next) => {
    try{        
        const token = authService.getTokenByRequest(req);//.body.token || req.query.token || req.headers['x-access-token'];        
        const data = await authService.decodeToken(token);
        
        const customer = await repository.getById(data.id);
        
        if (!customer) {
            statusCode.retNotFound(res, {
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        statusCode.retCreated(res, {
          token: tokenData,
          data: {
              email: customer.email,
              name: customer.name
          }  
        })
    }catch (e){        
        statusCode.retErro(res, {
            message: 'Falha ao processar a requisição',
            error: e
        });
    }    
}


exports.post = async(req, res, next) => {
    let contract = ValidatioCustomer.validar(req.body);
    
    if (!contract.isValid()){
        statusCode.retErro(res, contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });

        emailService.send(
            req.body.email, 
            'Bem vindo ao fabiostefani.io', 
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        statusCode.retCreated(res, {
            message: 'Cliente cadastrado com sucesso'
        });        
    } catch (e) {
        statusCode.retErro(res, {
            message: 'Falha ao cadastrar o cliente',
            data: req.body,
            error: e
        })
    }
}

exports.put = async(req, res, next) => {
    let contract =  ValidatioCustomer.validar(req.body);
        
    if (!contract.isValid()){
        statusCode.retErro(res, contract.errors()).end();
        return;
    }
    
    try {
        await repository.update(req.params.id, req.body);
        statusCode.retSucesso(res, {
            message: 'Cliente atualizado com sucesso'
        });        
    } catch (e) {
        statusCode.retErro(res, {
            message: 'Erro atualizando o cliente',
            data: req.body,
            error: e
        })
    }    
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        statusCode.retSucesso(res, {
            message: 'Cliente removido com sucesso'
        });        
    } catch (e) {
        statusCode.retErro(res, {
            message: 'Erro ao remover o cliente',
            error: e
        })
    }    
}

exports.inactivate = async(req, res, next) => {
    try {
        await repository.inactivate(req.params.id);
        statusCode.retSucesso(res, {
            message: 'Cliente inativado com sucesso'
        });        
    } catch (e) {
        statusCode.retErro(res, {
            message: 'Erro inativando o cliente',
            data: req.body,
            error: e
        })
    }    
}

exports.activate = async(req, res, next) => {
    try {
        await repository.activate(req.params.id);
        statusCode.retSucesso(res, {
            message: 'Cliente ativado com sucesso'
        });        
    } catch (e) {
        statusCode.retErro(res, {
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

        statusCode.retCreated(res, {
            message: 'E-mail enviado com sucesso'
        });        
    } catch (e) {
        statusCode.retErro(res, {
            message: 'Falha ao cadastrar o cliente',
            data: req.body,
            error: e
        })
    }
}