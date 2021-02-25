const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
    },
    name: String,
    author: String,
    description: String,
    image: String,
    price: Number,
});

module.exports = model('Book', bookSchema);
