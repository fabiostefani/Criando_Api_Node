/* eslint-disable no-undef */
'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = (req, res, next) => {
    Customer.find({

    }).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
}

exports.getByName = (req, res, next) => {
    Customer.find({
        name : req.params.name
    }).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
}

exports.post = (req, res, next) => {
    const customer = new Customer(req.body);
    customer.save().then(x => {
        res.status(201).send({
            message: "Cliente cadastrado com sucesso"
        });
    }).catch(e=> {
        res.status(400).send({
            message: 'Falha ao cadastrar o cliente',
            data: req.body,
            error: e
        })
    })
}

exports.put = (req, res, next) => {
    Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            name : req.body.name
        }
    }).then(e => {
        res.status(200).send({
            message: 'Cliente atualizado com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Erro atualizando o cliente',
            data: req.body,
            error: e
        })
    })
}

exports.delete = (req, res, next) => {
    Customer.findByIdAndDelete(req.body.id).then(x => {
        res.status(200).send({
            message: 'Cliente removido com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Erro ao remover o cliente',
            error: e
        })
    })
}

exports.inactivate = (req, res, next) => {
    Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            active : false
        }
    }).then(e => {
        res.status(200).send({
            message: 'Cliente inativado com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Erro inativando o cliente',
            data: req.body,
            error: e
        })
    })
}

exports.activate = (req, res, next) => {
    Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            active : true
        }
    }).then(e => {
        res.status(200).send({
            message: 'Cliente ativado com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Erro ativando o cliente',
            data: req.body,
            error: e
        })
    })
}