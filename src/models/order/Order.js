const Order = require('./schema/Order');

const findAll = async (condition) => {
    try {
        return await Order.find(condition);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    findAll,
};
