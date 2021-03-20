const Book = require('./schema/Book');

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

const getRandomBooks = async (limit) => {
    try {
        const count = await Book.countDocuments();
        const randNumber = Math.floor(Math.random() * count);
        let skip = 0;
        if (count > randNumber + limit) {
            skip = randNumber;
        }
        return await Book.find().skip(skip).limit(limit);
    } catch (error) {
        throw new Error(error);
    }
};

const getDiscountedBooks = async (limit) => {
    try {
        return await Book.find({ promotion: { $nin: [0, null, undefined] } })
            .sort({ createdAt: -1 })
            .limit(limit);
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
    getRandomBooks,
    getDiscountedBooks,
    findOneById,
    insert,
    insertMany,
    updateById,
    deleteById,
};
