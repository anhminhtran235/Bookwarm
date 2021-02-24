const { model, Schema } = require('mongoose');
const { ObjectID } = require('mongodb');

const CartItem = require('./CartItem');

const buyerSchema = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: Date,
    orders: [
        {
            type: ObjectID,
            ref: 'BuyerOrder',
        },
    ],
    cart: [CartItem],
});

module.exports = model('Buyer', buyerSchema);
