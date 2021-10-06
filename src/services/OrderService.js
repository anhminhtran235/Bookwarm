const { DataSource } = require('apollo-datasource');
const { ApolloError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const cloudinary = require('../util/cloudinary');

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
            const parsedToken = this.context.req.parsedToken;
            if (!parsedToken) {
                throw new ApolloError('Please login first');
            }
            const user = await this.store.userRepo.findById(parsedToken.id);
            if (!user) {
                throw new ApolloError('Cannot find user profile');
            }

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

            await user.save();

            return newCartItem;
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeFromCart(args) {
        try {
            const parsedToken = this.context.req.parsedToken;
            if (!parsedToken) {
                throw new ApolloError('Please login first');
            }
            const user = await this.store.userRepo.findById(parsedToken.id);
            if (!user) {
                throw new ApolloError('Cannot find user profile');
            }

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
                await user.save();
            }

            return updatedItem;
        } catch (error) {
            throw new Error(error);
        }
    }

    async checkout(args) {
        try {
            const { password } = args;
            const parsedToken = this.context.req.parsedToken;
            if (!parsedToken) {
                throw new ApolloError('Please login first');
            }
            const user = await this.store.userRepo.findById(parsedToken.id);
            await user.populate('cart.book').execPopulate();
            if (!user) {
                throw new ApolloError('Cannot find user profile');
            }

            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordMatch) {
                throw new ApolloError('Invalid credential');
            }

            const newOrder = await this.store.orderRepo.makeOrderFromCart(
                user.cart
            );
            user.orders.push(newOrder._id);
            user.cart = [];
            await user.save();
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
}

module.exports = OrderService;
