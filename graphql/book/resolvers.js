const book = require('../../models/book/Book');

module.exports = {
    Query: {
        async getBooks() {
            try {
                return book.findBooks({}, { createdAt: -1 }, 0);
            } catch (error) {
                throw new Error(error);
            }
        },
    },
};
