const { model, Schema } = require('mongoose');

const buyerSchema = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BuyerOrder',
        },
    ],
    cart: [
        {
            book: {
                type: Schema.Types.ObjectId,
                ref: 'Book',
            },
            quantity: Number,
        },
    ],
});

module.exports = model('Buyer', buyerSchema);
