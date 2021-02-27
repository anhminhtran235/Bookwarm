const {
    UserInputError,
    AuthenticationError,
    ApolloError,
} = require('apollo-server');
const bcrypt = require('bcryptjs');

const sellerModule = require('../../models/seller/Seller');
const bookModule = require('../../models/book/Book');
const sellerOrderModule = require('../../models/sellerOrder/SellerOrder');
const { generateToken } = require('../../util/util');
const authCheck = require('../../util/authCheck');

module.exports = {
    Seller: {
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
            return await sellerOrderModule.findAll(condition);
        },
    },
    Query: {
        async findSellerById(parent, args, context, info) {
            try {
                const { id } = args;
                return await sellerModule.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        },
        async findAllSellers(parent, args, context, info) {
            try {
                return await sellerModule.findAll();
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        async registerSeller(parent, args, context, info) {
            try {
                let { username, email, password } = args.registerInput;

                const isEmailExisted =
                    (await sellerModule.findOne({ email }))?.length > 0;
                if (isEmailExisted) {
                    throw new UserInputError('Email already exists');
                }

                password = await bcrypt.hash(password, 12);
                const newSeller = await sellerModule.insert(
                    username,
                    email,
                    password
                );

                const token = generateToken(newSeller);

                return {
                    ...newSeller._doc,
                    id: newSeller._id,
                    token,
                };
            } catch (error) {
                throw new Error(error);
            }
        },
        async loginSeller(parent, args, context, info) {
            try {
                const { email, password } = args.loginInput;

                const seller = await sellerModule.findOne({ email });

                if (!seller) {
                    throw new AuthenticationError('Invalid credentials');
                }

                const isPasswordMatch = await bcrypt.compare(
                    password,
                    seller.password
                );
                if (!isPasswordMatch) {
                    throw new AuthenticationError('Invalid credentials');
                }

                const token = generateToken(seller);

                return {
                    ...seller._doc,
                    id: seller._id,
                    token,
                };
            } catch (error) {
                throw new Error(error);
            }
        },
        async updateSeller(parent, args, context, info) {
            try {
                const parsedToken = authCheck(context);
                const seller = await sellerModule.findById(parsedToken.id);
                if (!seller) {
                    throw new ApolloError('Cannot find seller profile');
                }
                const { username, oldPassword, newPassword } = args.updateInput;
                if (newPassword) {
                    if (!oldPassword) {
                        throw new UserInputError('Empty old password');
                    }
                    const isPasswordMatch = await bcrypt.compare(
                        oldPassword,
                        seller.password
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

                const updatedSeller = await sellerModule.updateById(
                    seller.id,
                    updateInfo
                );

                return {
                    ...updatedSeller._doc,
                    id: updatedSeller._id,
                };
            } catch (error) {
                throw new Error(error);
            }
        },
    },
};
