const { model, Schema } = require('mongoose');

const sellerSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    avatar: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SellerOrder',
        },
    ],
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
});

module.exports = model('Seller', sellerSchema);
