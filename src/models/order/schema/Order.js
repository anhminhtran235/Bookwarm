const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
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

module.exports = model('Order', orderSchema);
