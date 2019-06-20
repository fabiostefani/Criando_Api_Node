/* eslint-disable no-undef */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
// const router = express.Router();

//conecta ao banco
mongoose.connect('mongodb+srv://fabiostefani:fabiostefani@fabiostefani-mongodb-8xxdq.mongodb.net/test?retryWrites=true&w=majority')

//carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');

//carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);

module.exports = app;