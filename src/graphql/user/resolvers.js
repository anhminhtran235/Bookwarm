const {
    UserInputError,
    AuthenticationError,
    ApolloError,
} = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModule = require('../../models/user/User');
const bookModule = require('../../models/book/Book');
const orderModule = require('../../models/order/Order');
const cloudinary = require('../../util/cloudinary');

module.exports = {
    User: {
        async books(parent) {
            const condition = {
                _id: {
                    $in: parent.books,
                },
            };
            return await bookModule.findAll(condition);
        },
        async orders(parent) {
            const condition = {
                _id: {
                    $in: parent.orders,
                },
            };
            return await orderModule.findAll(condition, { createdAt: -1 });
        },
    },
    CartItem: {
        async book(parent) {
            return await bookModule.findOneById(parent.book);
        },
    },
    OrderItem: {
        async book(parent) {
            return await bookModule.findOneById(parent.book);
        },
    },
    Query: {
        async findUserById(parent, args, context, info) {
            try {
                const { id } = args;
                return await userModule.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        },
        async findAllUsers(parent, args, context, info) {
            try {
                return await userModule.findAll();
            } catch (error) {
                throw new Error(error);
            }
        },
        async getMe(parent, args, context, info) {
            try {
                const parsedToken = context.req.parsedToken;
                if (!parsedToken) {
                    return null;
                }
                const { id } = parsedToken;
                return userModule.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        async register(parent, args, context, info) {
            try {
                let { username, email, password, avatar } = args.registerInput;

                const isEmailExisted = !!(await userModule.findOne({
                    email,
                }));
                if (isEmailExisted) {
                    throw new UserInputError('Email already exists');
                }

                password = await bcrypt.hash(password, 12);

                let avatarUrl = '';
                if (avatar && avatar !== '') {
                    avatarUrl = (await cloudinary.uploader.upload(avatar)).url;
                }

                const newUser = await userModule.insert(
                    username,
                    email,
                    password,
                    avatarUrl
                );

                const token = generateToken(newUser);
                context.res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days cookies
                });

                return newUser;
            } catch (error) {
                throw new Error(error);
            }
        },
        async login(parent, args, context, info) {
            try {
                const { email, password } = args.loginInput;

                const user = await userModule.findOne({ email });

                if (!user) {
                    throw new AuthenticationError('Invalid credentials');
                }

                const isPasswordMatch = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!isPasswordMatch) {
                    throw new AuthenticationError('Invalid credentials');
                }

                const token = generateToken(user);
                context.res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days cookies
                });

                return user;
            } catch (error) {
                throw new Error(error);
            }
        },
        async logout(parent, args, context, info) {
            // Remove Cookie
            context.res.cookie('token', '', {
                httpOnly: true,
                expires: new Date(0), // Thu, 01 Jan 1970
            });
        },
        async updateUser(parent, args, context, info) {
            try {
                const parsedToken = context.req.parsedToken;
                if (!parsedToken) {
                    throw new ApolloError('Please login first');
                }
                const user = await userModule.findById(parsedToken.id);
                if (!user) {
                    throw new ApolloError('Cannot find user profile');
                }
                const { username, oldPassword, newPassword } = args;
                if (!oldPassword) {
                    throw new UserInputError('Please re-enter your password');
                }
                const isPasswordMatch = await bcrypt.compare(
                    oldPassword,
                    user.password
                );
                if (!isPasswordMatch) {
                    throw new UserInputError('Wrong password');
                }

                const updateInfo = {};
                if (username) {
                    updateInfo.username = username;
                }
                if (newPassword) {
                    updateInfo.password = await bcrypt.hash(newPassword, 12);
                }

                const updatedUser = await userModule.updateById(
                    user.id,
                    updateInfo
                );

                return {
                    ...updatedUser._doc,
                    id: updatedUser._id,
                };
            } catch (error) {
                throw new Error(error);
            }
        },
        async addToCart(parent, args, context, info) {
            try {
                const parsedToken = context.req.parsedToken;
                if (!parsedToken) {
                    throw new ApolloError('Please login first');
                }
                const user = await userModule.findById(parsedToken.id);
                if (!user) {
                    throw new ApolloError('Cannot find user profile');
                }

                const { bookId } = args;
                const isBookExists = !!(await bookModule.findOneById(bookId));
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
        },
        async removeFromCart(parent, args, context, info) {
            try {
                const parsedToken = context.req.parsedToken;
                if (!parsedToken) {
                    throw new ApolloError('Please login first');
                }
                const user = await userModule.findById(parsedToken.id);
                if (!user) {
                    throw new ApolloError('Cannot find user profile');
                }

                const { bookId } = args;
                const isBookExists = !!(await bookModule.findOneById(bookId));
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
        },
        async checkout(parent, args, context, info) {
            try {
                const { password } = args;
                const parsedToken = context.req.parsedToken;
                if (!parsedToken) {
                    throw new ApolloError('Please login first');
                }
                const user = await userModule.findById(parsedToken.id);
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

                const newOrder = await orderModule.makeOrderFromCart(user.cart);
                user.orders.push(newOrder._id);
                user.cart = [];
                await user.save();
                return newOrder._doc;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
};

const generateToken = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        process.env.JSON_SECRET
    );
    return token;
};
