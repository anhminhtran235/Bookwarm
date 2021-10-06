const Order = require('../models/Order');

const findAll = async (condition, sort) => {
    try {
        return await Order.find(condition).sort(sort);
    } catch (error) {
        throw new Error(error);
    }
};

const insert = async (orderItems) => {
    try {
        const order = new Order({ orderItems });
        return await order.save();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    findAll,
    insert,
};
