'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() => {
    var res = await Customer.find({}, 'name email');
    return res;
}

exports.getByName = async(nome) => {
    var res = await Customer.find({
        name : nome
    });
    return res;
}

exports.getById = async(id) => {
    var res = await Customer.findOne({_id: id});
    return res;
}

exports.authenticate = async(data) => {
    var res = await Customer.findOne({
        email: data.email,
        password: data.password
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
            name : data.name,
            email : data.email,
            password : data.password
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