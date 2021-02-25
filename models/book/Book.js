const Book = require('./schema/Book');

const findPaginate = async (condition, sort, skip, limit) => {
    try {
        return await Book.find(condition).sort(sort).skip(skip).limit(limit);
    } catch (error) {
        throw new Error(error);
    }
};

const findAll = async (condition) => {
    try {
        return await Book.find(condition);
    } catch (error) {
        throw new Error(error);
    }
};

const insert = async (data) => {
    try {
        const newBook = new Book(data);
        return await newBook.save();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    findPaginate,
    insert,
    findAll,
};
