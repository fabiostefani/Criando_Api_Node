'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() => {
    var res = await Customer.find();
    return res;
}

exports.getByName = async(nome) => {
    var res = await Customer.find({
        name : nome
    });
    return res;
}

exports.create = async(data) => {
    const customer = new Customer(data);
    await customer.save();
}

exports.update = async(id, data) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            name : data.name
        }
    })
}

exports.delete = async(id) => {
    await Customer.findByIdAndDelete(id);
}

exports.inactivate = async(id) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            active : false
        }
    })
}

exports.activate = async(id) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            active : true
        }
    })
}