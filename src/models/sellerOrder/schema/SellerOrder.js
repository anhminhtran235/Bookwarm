const { model, Schema } = require('mongoose');

const sellerOrderSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'Buyer',
    },
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

module.exports = model('SellerOrder', sellerOrderSchema);
