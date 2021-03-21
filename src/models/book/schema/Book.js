const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    subtitle: String,
    author: String,
    shortDescription: String,
    description: String,
    image: String,
    price: Number,
    promotion: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Number,
        default: () => Date.now(),
    },
});

module.exports = model('Book', bookSchema);
