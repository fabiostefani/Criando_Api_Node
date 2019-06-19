/* eslint-disable no-undef */
'use strict'

exports.post = (req, res, next) => {
    res.status(201).send(req.body);
}

exports.put = (req, res, next) => {
    const id = req.params.id; //PARAMS PEGA OS DADOS QUE VC ENCAMINHOU DA URL
    res.status(200).send( {
        id: id,
        item: req.body
    });
}

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
}