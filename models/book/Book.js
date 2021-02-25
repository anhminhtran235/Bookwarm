const Book = require('./schema/Book');

const findBooks = (condition, sort, skip, limit) => {
    return Book.find(condition).sort(sort).skip(skip).limit(limit);
};

module.exports = {
    findBooks,
};
