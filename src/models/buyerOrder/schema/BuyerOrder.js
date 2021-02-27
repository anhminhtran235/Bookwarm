const { model, Schema } = require('mongoose');

const buyerOrderSchema = new Schema({
    orderItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'OrderItem',
        },
    ],
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
});

module.exports = model('BuyerOrder', buyerOrderSchema);
