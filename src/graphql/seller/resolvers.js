const {
    UserInputError,
    AuthenticationError,
    ApolloError,
} = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sellerModule = require('../../models/seller/Seller');
const bookModule = require('../../models/book/Book');
const sellerOrderModule = require('../../models/sellerOrder/SellerOrder');
const authCheck = require('../../util/authCheck');
const cloudinary = require('../../util/cloudinary');

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
                let { shopName, email, password, avatar } = args.registerInput;

                const isEmailExisted = !!(await sellerModule.findOne({
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

                const newSeller = await sellerModule.insert(
                    shopName,
                    email,
                    password,
                    avatarUrl
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
                const { shopName, oldPassword, newPassword } = args.updateInput;
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
                if (shopName) {
                    updateInfo.shopName = shopName;
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
