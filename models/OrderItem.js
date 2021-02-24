const { model, Schema } = require('mongoose');
const { ObjectID } = require('mongodb');

const orderItemSchema = new Schema({
    book: {
        type: ObjectID,
        ref: Book,
    },
    quantity: Number,
    pricePerItem: Number,
});

module.exports = model('OrderItem', orderItemSchema);
