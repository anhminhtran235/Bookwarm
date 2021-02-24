const { model, Schema } = require('mongoose');
const { ObjectID } = require('mongodb');

const CartItemSchema = new Schema({
    book: {
        type: ObjectID,
        ref: Book,
    },
    quantity: Number,
});

module.exports = model('CartItem', CartItemSchema);
