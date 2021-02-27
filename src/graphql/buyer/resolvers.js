const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');

const buyerModule = require('../../models/buyer/Buyer');
const { generateToken } = require('../../util/util');

module.exports = {
    Query: {
        async getBuyers() {
            try {
                const buyers = await buyerModule.findAll();
                return buyers;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        async registerBuyer(parent, args, context, info) {
            try {
                let { username, email, password } = args.registerInput;
                const isEmailExisted = !!(await buyerModule.findOne({ email }));
                if (isEmailExisted) {
                    throw new UserInputError('Email already exists');
                }

                password = await bcrypt.hash(password, 12);
                const buyer = await buyerModule.insert({
                    username,
                    email,
                    password,
                });

                const token = generateToken(buyer);

                return {
                    ...buyer._doc,
                    id: buyer._id,
                    token,
                };
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
        async loginBuyer(parent, args, context, info) {
            try {
                let { email, password } = args.loginInput;
                let buyer = await buyerModule.findOne({ email });
                if (!buyer) {
                    throw new AuthenticationError('Wrong credentials');
                }

                const isPasswordMatch = await bcrypt.compare(
                    password,
                    buyer.password
                );
                if (isPasswordMatch) {
                    const token = generateToken(buyer);

                    return {
                        ...buyer._doc,
                        id: buyer._id,
                        token,
                    };
                } else {
                    throw new AuthenticationError('Wrong credentials');
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
    },
};
