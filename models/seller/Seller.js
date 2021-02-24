const { model, Schema } = require('mongoose');
const { ObjectID } = require('mongodb');

const sellerSchema = new Schema({
    username: String,
    email: String,
    password: String,
    avatar: String,
    createdAt: Date,
    orders: [
        {
            type: ObjectID,
            ref: 'SellerOrder',
        },
    ],
    books: [
        {
            type: ObjectID,
            ref: 'Book',
        },
    ],
});

module.exports = model('Seller', sellerSchema);
