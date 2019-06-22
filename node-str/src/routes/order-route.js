/* eslint-disable no-undef */
'use strict'

 const express = require('express');
 const router = express.Router();

 const controller = require('../controllers/order-controller');

 router.get('/', controller.get);
 router.get('/id/:id', controller.getById);
 router.get('/number/:number', controller.getByNumber);

 router.post('/', controller.post);
//  router.put('/:id', controller.put );
 router.delete('/', controller.delete );

module.exports = router;