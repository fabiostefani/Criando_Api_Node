'use strict'

const ValidationContract = require('../validators/base/fluent-validador');

exports.validateCreate = (product) => {
    let contract = new ValidationContract();
    contract.hasMinLen(product.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(product.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(product.description, 3, 'A descrição deve conter pelo menos 3 caracteres');
    contract.isRequired(product.tags, 'Obrigatório informar as TAGS');
    contract.isGreaterThan(product.price, 0, 'O preço deve ser superior a zero');
    return contract;
}

exports.validateUpdate = (product) => {
    let contract = new ValidationContract();
    contract.hasMinLen(product.title, 3, 'O título deve conter pelo menos 3 caracteres');    
    contract.hasMinLen(product.description, 3, 'A descrição deve conter pelo menos 3 caracteres');
    contract.isGreaterThan(product.price, 0, 'O preço deve ser superior a zero');
    return contract;
}