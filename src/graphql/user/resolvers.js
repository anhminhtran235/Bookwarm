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
            return await orderModule.findAll(condition);
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
                    httpOnly: false,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days cookies
                });

                return {
                    ...newUser._doc,
                    id: newUser._id,
                };
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
                context.response.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days cookies
                });

                return {
                    ...user._doc,
                    id: user._id,
                };
            } catch (error) {
                throw new Error(error);
            }
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
                const { username, oldPassword, newPassword } = args.updateInput;
                if (newPassword) {
                    if (!oldPassword) {
                        throw new UserInputError('Empty old password');
                    }
                    const isPasswordMatch = await bcrypt.compare(
                        oldPassword,
                        user.password
                    );
                    if (!isPasswordMatch) {
                        throw new UserInputError('Invalid old password');
                    }
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
