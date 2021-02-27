const Buyer = require('./schema/Buyer');

const findOne = async (condition) => {
    try {
        return await Buyer.findOne(condition);
    } catch (error) {
        throw new Error(error);
    }
};

const findAll = async (condition) => {
    try {
        return await Buyer.find(condition);
    } catch (error) {
        throw new Error(error);
    }
};

const insert = async (data) => {
    try {
        return (await new Buyer(data)).save();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    findOne,
    findAll,
    insert,
};
