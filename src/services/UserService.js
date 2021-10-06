const { DataSource } = require('apollo-datasource');
const {
    UserInputError,
    AuthenticationError,
    ApolloError,
} = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../util/cloudinary');

class UserService extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async findUserById(args) {
        try {
            const { id } = args;
            return await this.store.userRepo.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAllUsers() {
        try {
            return await this.store.userRepo.findAll();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getMe() {
        try {
            const parsedToken = this.context.req.parsedToken;
            if (!parsedToken) {
                return null;
            }
            const { id } = parsedToken;
            return this.store.userRepo.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async register(args) {
        try {
            let { username, email, password, avatar } = args.registerInput;

            const isEmailExisted = !!(await this.store.userRepo.findOne({
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

            const newUser = await this.store.userRepo.insert(
                username,
                email,
                password,
                avatarUrl
            );

            const token = this.generateToken(newUser);
            this.context.res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days cookies
            });

            return newUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    async login(args) {
        try {
            const { email, password } = args.loginInput;

            const user = await this.store.userRepo.findOne({ email });

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

            const token = this.generateToken(user);
            this.context.res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days cookies
            });

            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async logout() {
        // Remove Cookie
        this.context.res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0), // Thu, 01 Jan 1970
        });
    }

    async updateUser(args) {
        try {
            const parsedToken = this.context.req.parsedToken;
            if (!parsedToken) {
                throw new ApolloError('Please login first');
            }
            const user = await this.store.userRepo.findById(parsedToken.id);
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

            const updatedUser = await this.store.userRepo.updateById(
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
    }

    generateToken(user) {
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JSON_SECRET
        );
        return token;
    }
}

module.exports = UserService;
