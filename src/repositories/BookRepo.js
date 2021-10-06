const Book = require('../models/Book');

const findPaginate = async (condition, sort, skip, limit) => {
    try {
        return await Book.find(condition).sort(sort).skip(skip).limit(limit);
    } catch (error) {
        throw new Error(error);
    }
};

const countBooks = async (condition) => {
    try {
        return await Book.find(condition).countDocuments();
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

const findOneById = async (id) => {
    try {
        return await Book.findById(id);
    } catch (error) {
        throw new Error(error);
    }
};

const insert = async (data) => {
    try {
        return await new Book(data).save();
    } catch (error) {
        throw new Error(error);
    }
};

const insertMany = async (arr) => {
    try {
        return await Book.insertMany(arr);
    } catch (error) {
        throw new Error(error);
    }
};

const updateById = async (id, data) => {
    try {
        return await Book.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

const deleteById = async (id) => {
    try {
        return await Book.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    findPaginate,
    countBooks,
    findAll,
    findOneById,
    insert,
    insertMany,
    updateById,
    deleteById,
};
