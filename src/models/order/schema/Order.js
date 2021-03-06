const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
    orderItems: [
        {
            book: {
                type: Schema.Types.ObjectId,
                ref: 'Book',
            },
            quantity: Number,
            pricePerItem: Number,
        },
    ],
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
});

module.exports = model('Order', orderSchema);
