const SellerOrder = require('./schema/SellerOrder');

const findAll = async (condition) => {
    try {
        return await SellerOrder.find(condition);
    } catch (error) {
        throw new Error(error);
    }
};

const insert = async (data) => {
    try {
        return await new SellerOrder(data).save();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    findAll,
    insert,
};
