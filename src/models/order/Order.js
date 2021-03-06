const Order = require('./schema/Order');

const findAll = async (condition) => {
    try {
        return await Order.find(condition);
    } catch (error) {
        throw new Error(error);
    }
};

const makeOrderFromCart = async (cart) => {
    try {
        const orderItems = [];
        cart.forEach((item) => {
            const orderItem = {
                book: item?._doc?.book?._doc?._id,
                quantity: item?._doc?.quantity,
                pricePerItem: item?._doc?.book?._doc?.price,
            };
            orderItems.push(orderItem);
        });

        const order = new Order({ orderItems });
        return await order.save();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    findAll,
    makeOrderFromCart,
};
