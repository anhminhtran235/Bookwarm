const Seller = require('./schema/Seller');

const insert = async (username, email, password, avatar) => {
    try {
        const seller = new Seller({
            username,
            email,
            password,
            avatar,
        });
        await seller.save();
        return seller;
    } catch (error) {
        throw new Error(error);
    }
};

const findById = async (id) => {
    try {
        return await Seller.findById(id);
    } catch (error) {
        throw new Error(error);
    }
};

const findOne = async (condition) => {
    try {
        return await Seller.findOne(condition);
    } catch (error) {
        throw new Error(error);
    }
};

const findAll = async () => {
    try {
        return await Seller.find();
    } catch (error) {
        throw new Error(error);
    }
};

const updateById = async (id, updateInfo) => {
    try {
        return await Seller.findByIdAndUpdate(id, updateInfo);
    } catch (error) {
        throw new Error(error);
    }
};

const addNewBook = async (id, bookId) => {
    try {
        return await Seller.findByIdAndUpdate(id, {
            $push: { books: bookId },
        });
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    insert,
    findById,
    findOne,
    findAll,
    updateById,
    addNewBook,
};
