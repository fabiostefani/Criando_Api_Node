/* eslint-disable no-undef */
'use strict'

 const express = require('express');
 const router = express.Router();

 const controller = require('../controllers/customer-controller');

 router.get('/', controller.get);
 router.get('/name/:name', controller.getByName);
// router.get('/:slug', controller.getBySlug);

 router.post('/', controller.post);
 router.put('/:id', controller.put );
 router.put('/inactivate/:id', controller.inactivate );
 router.put('/activate/:id', controller.activate );
 router.delete('/', controller.delete );

module.exports = router;