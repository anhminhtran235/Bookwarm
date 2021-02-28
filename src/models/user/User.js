const User = require('./schema/User');

const insert = async (username, email, password, avatar) => {
    try {
        const user = new User({
            username,
            email,
            password,
            avatar,
        });
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

const findById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new Error(error);
    }
};

const findOne = async (condition) => {
    try {
        return await User.findOne(condition);
    } catch (error) {
        throw new Error(error);
    }
};

const findAll = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error(error);
    }
};

const updateById = async (id, updateInfo) => {
    try {
        return await User.findByIdAndUpdate(id, updateInfo, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

const addNewBook = async (id, bookId) => {
    try {
        return await User.findByIdAndUpdate(id, {
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
