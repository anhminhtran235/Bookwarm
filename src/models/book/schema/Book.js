const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    author: String,
    description: String,
    image: String,
    price: Number,
    createdAt: {
        type: Number,
        default: () => Date.now(),
    },
});

module.exports = model('Book', bookSchema);
