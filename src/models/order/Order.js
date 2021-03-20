const Order = require('./schema/Order');

const findAll = async (condition, sort) => {
    try {
        return await Order.find(condition).sort(sort);
    } catch (error) {
        throw new Error(error);
    }
};

const makeOrderFromCart = async (cart) => {
    try {
        const orderItems = [];
        cart.forEach((item) => {
            const promotion = item?._doc?.book?._doc?.promotion;
            const price = item?._doc?.book?._doc?.price;
            const realPrice = promotion
                ? (price * (100 - promotion)) / 100
                : price;
            const orderItem = {
                book: item?._doc?.book?._doc?._id,
                quantity: item?._doc?.quantity,
                pricePerItem: realPrice,
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
