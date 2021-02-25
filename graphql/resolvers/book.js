const Book = require('../../models/Book');

module.exports = {
    Query: {
        async getBooks() {
            try {
                const books = await Book.find();
                return books;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
};
