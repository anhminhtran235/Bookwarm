const { model, Schema } = require('mongoose');

const orderItemSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: Book,
    },
    quantity: Number,
    pricePerItem: Number,
});

module.exports = model('OrderItem', orderItemSchema);
