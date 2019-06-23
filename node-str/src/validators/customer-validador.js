'use strict'
const ValidationContract = require('../validators/base/fluent-validador');

exports.validar = (customer) =>
{
    let contract = new ValidationContract();
    contract.hasMinLen(customer.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    contract.isEmail(customer.email, 'E-mail inválido');
    contract.hasMinLen(customer.password, 6, 'A senha deve conter ao menos 6 caracteres');
    return contract;
}