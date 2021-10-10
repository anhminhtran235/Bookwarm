const { DataSource } = require('apollo-datasource');
const { ApolloError } = require('apollo-server');
const bcrypt = require('bcryptjs');

const { authCheck } = require('../util/authCheck');

class OrderService extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async addToCart(args) {
        try {
            const user = await authCheck(this.context.req, this.store.userRepo);

            const { bookId } = args;
            const isBookExists = !!(await this.store.bookRepo.findOneById(
                bookId
            ));
            if (!isBookExists) {
                throw new ApolloError('Book does not exist');
            }

            let newCartItem = null;
            const index = user.cart.findIndex(
                (item) => item.book.toString() === bookId
            );
            if (index === -1) {
                newCartItem = { book: bookId, quantity: 1 };
                user.cart.push(newCartItem);
            } else {
                user.cart[index].quantity++;
                newCartItem = user.cart[index];
            }

            this.store.userRepo.save(user);

            return newCartItem;
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeFromCart(args) {
        try {
            const user = await authCheck(this.context.req, this.store.userRepo);

            const { bookId } = args;
            const isBookExists = !!(await this.store.bookRepo.findOneById(
                bookId
            ));
            if (!isBookExists) {
                throw new ApolloError('Book does not exist');
            }

            let updatedItem;
            const index = user.cart.findIndex(
                (item) => item.book.toString() === bookId
            );
            if (index === -1) {
                throw new ApolloError('Book is not in cart');
            } else {
                user.cart[index].quantity--;
                updatedItem = user.cart[index];
                if (user.cart[index].quantity === 0) {
                    user.cart.splice(index, 1);
                }
                this.store.userRepo.save(user);
            }

            return updatedItem;
        } catch (error) {
            throw new Error(error);
        }
    }

    async checkout(args) {
        try {
            const { password } = args;

            const user = await authCheck(this.context.req, this.store.userRepo);
            await this.store.userRepo.populate(user, 'cart.book');

            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordMatch) {
                throw new ApolloError('Invalid credential');
            }

            const newOrder = await this.makeOrderFromCart(user.cart);
            user.orders.push(newOrder._id);
            user.cart = [];
            this.store.userRepo.save(user);
            return newOrder._doc;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAllByIds(orderIds) {
        const condition = {
            _id: {
                $in: orderIds,
            },
        };
        return await this.store.orderRepo.findAll(condition, { createdAt: -1 });
    }

    async makeOrderFromCart(cart) {
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
            return await this.store.orderRepo.insert(orderItems);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = OrderService;
