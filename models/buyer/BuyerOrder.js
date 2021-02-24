const { model, Schema } = require('mongoose');
const { ObjectID } = require('mongodb');

const buyerOrderSchema = new Schema({
    orderItems: [
        {
            type: ObjectID,
            ref: 'OrderItem',
        },
    ],
    createdAt: Date,
});

module.exports = model('BuyerOrder', buyerOrderSchema);
