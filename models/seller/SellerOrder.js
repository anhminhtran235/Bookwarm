const { model, Schema } = require('mongoose');
const { ObjectID } = require('mongodb');

const sellerOrderSchema = new Schema({
    buyer: {
        type: ObjectID,
        ref: 'Buyer',
    },
    orderItems: [
        {
            type: ObjectID,
            ref: 'OrderItem',
        },
    ],
    createdAt: Date,
});

module.exports = model('SellerOrder', sellerOrderSchema);
