/* eslint-disable no-undef */
'use strict'

 const express = require('express');
 const router = express.Router();

 const controller = require('../controllers/order-controller');
 const authService = require('../services/infra/auth-service');

 router.get('/', authService.authorize, controller.get);
 router.get('/id/:id', authService.authorize, controller.getById);
 router.get('/number/:number', authService.authorize, controller.getByNumber);

 router.post('/', authService.authorize, controller.post);
//  router.put('/:id', controller.put );
 router.delete('/', authService.authorize, controller.delete );

module.exports = router;