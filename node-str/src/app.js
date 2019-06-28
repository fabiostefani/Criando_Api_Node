/* eslint-disable no-undef */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
// const router = express.Router();

//conecta ao banco
mongoose.connect(config.connectionString);
// mongoose.connect('mongodb://localhost:27017/exampleDb')

//carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');



app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
     extended: false 
}));

//HABILITA O CORS
// app.use(function(req, res, next) {
//     res.header('Access-Control-Alow-Origin','*');
//     res.header('Access-Control-Alow-Hearders','Origin, X-Requested-With, Content-Type, Accept, x-access-token');
//     res.header('Access-Control-Alow-Methods','GET, POST, PUT, DELETE, OPTIONS');
// });

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;