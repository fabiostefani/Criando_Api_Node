'use strict'

const ValidationContract = require('./base/fluent-validador');

exports.validateCreate = (order) => {
    let contract = new ValidationContract();
    contract.isRequired(order.customer, 'Cliente não foi informado');
    return contract;
} 