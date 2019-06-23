'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

//#region GET
exports.get = async() => {
    const res = await Order.find({}, 'number status createdate')
        .populate('customer', 'name ')
        .populate('items.product', 'title');
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
    var order = new Order(data);
    await order.save();    
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