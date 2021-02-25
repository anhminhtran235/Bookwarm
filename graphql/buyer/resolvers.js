const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');

const Buyer = require('../../models/buyer/Buyer');
const { generateToken } = require('../../util/util');

module.exports = {
    Query: {
        async getBuyers() {
            try {
                const buyers = await Buyer.find();
                return buyers;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
    },
    Mutation: {
        async registerBuyer(parent, args, context, info) {
            try {
                let { username, email, password } = args.registerInput;
                const isEmailExisted = !!(await Buyer.findOne({ email }));
                if (isEmailExisted) {
                    throw new UserInputError('Email already exists', {
                        errors: {
                            email: 'Email already exists',
                        },
                    });
                }

                password = await bcrypt.hash(password, 12);
                const buyer = new Buyer({ username, email, password });
                await buyer.save();

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
                let buyer = await Buyer.findOne({ email });
                if (!buyer) {
                    throw new AuthenticationError('Wrong credentials', {
                        errors: {
                            authenticationError: 'Wrong credentials',
                        },
                    });
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
                    throw new AuthenticationError('Wrong credentials', {
                        errors: {
                            authenticationError: 'Wrong credentials',
                        },
                    });
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
    },
};
