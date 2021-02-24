const { model, Schema } = require('mongoose');
const { ObjectID } = require('mongodb');

const bookSchema = new Schema({
    book: {
        type: ObjectID,
        ref: Book,
    },
    name: String,
    author: String,
    description: String,
    image: String,
    price: Number,
});

module.exports = model('Book', bookSchema);
