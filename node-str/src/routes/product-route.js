/* eslint-disable no-undef */
'use strict'

const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id; //PARAMS PEGA OS DADOS QUE VC ENCAMINHOU DA URL
    res.status(200).send( {
        id: id,
        item: req.body
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).send(req.body);
});

module.exports = router;