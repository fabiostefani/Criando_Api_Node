'use strict'

const jwt = require('jsonwebtoken');
const baseController = require('../../infra/retStatusCode');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {expiresIn: '1d'});
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (req, res, next) {    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];    
    if (!token) {
        baseController.retUnauthorized(res, {
            message: 'Acesso restrito'
        });        
    } else {        
        jwt.verify(token, global.SALT_KEY, function (error, decoded){
            if (error) {                
                baseController.retUnauthorized(res, {
                    message: 'Token inválido'
                });
            } else {                
                next();            
            }
        });
    }
}

var getTokenByRequest = exports.getTokenByRequest = (req) => {
    return req.body.token || req.query.token || req.headers['x-access-token'];
}

exports.isAdmin = function(req, res, next) {
    // var token = req.body.token || req.query.token || req.headers['x-access-token'];//this.getTokenRequest(req);
    var token = getTokenByRequest(req);
    if (!token) {
        baseController.retUnauthorized(res,{
            message: 'Token inválido'
        });        
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                baseController.retUnauthorized(res, {
                    message: 'Token inválido'
                });            
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    baseController.retForbidden(res,{
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
}