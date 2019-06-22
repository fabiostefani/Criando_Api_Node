'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

//#region GET
exports.get = async() => {
    const res = await Order.find({}); //INDICA QUAIS COLUNAS DESEJO RETORNAR NA BUSCA
    return res;                 
           
}

exports.getById = async(id) => {
    const res = await Order.findById(id);
    return res;
           
}

exports.getByNumber = async(number) => {
    const res = await Order.findOne({number: number});
    return res;
           
}
//#endregion

exports.create = async(data) => {
    var Order = new Order(data);
    await Order.save();    
}

// exports.update = async(id, data) => {
//     await Order.findByIdAndUpdate(id, {
//         $set: {                                 //$set faz a atualização do produto, define o que vai ser atualizado
//             title: data.title,
//             description: data.description,
//             price: data.price
//         }
//     })
// }

exports.delete = async(id) => {
    await Order.findByIdAndDelete(id);    
}