'use strict'


exports.retSucesso = (res, data) => {
    res.status(200).send(data);
}

exports.retCreated = (res, data) => {
    res.status(201).send(data);
}

exports.retErro = (res, data) => {
    res.status(400).send(data);
}

exports.retUnauthorized = (res, data) => {
    res.status(401).send(data);
}

exports.retForbidden = (res, data) => {
    res.status(403).send(data);
}

exports.retNotFound = (res, data) => {
    res.status(404).send(data);
}

exports.retInternalServerError = (res, data) => {
    res.status(500).send(data);
}