const UserService = require('../UserService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const getMockStore = () => ({
    bookRepo: {
        findPaginate: jest.fn(),
        countBooks: jest.fn(),
        findAll: jest.fn(),
        findOneById: jest.fn(),
        insert: jest.fn(),
        insertMany: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn(),
    },
    userRepo: {
        insert: jest.fn(),
        insertMany: jest.fn(),
        findById: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        updateById: jest.fn(),
        addNewBook: jest.fn(),
    },
});

let userService = null;
let mockStore = null;
beforeEach(() => {
    jest.resetModules();
    mockStore = getMockStore();
    userService = new UserService({ store: mockStore });
    userService.initialize({ context: { req: { parsedToken: 'xyz' } } });
});

describe('[UserService.findUserById]', () => {
    it('Should successfully find user by id', async () => {
        // given
        const args = {
            id: 100,
        };
        mockStore.userRepo.findById.mockReturnValueOnce({ id: 1 });

        // when
        const user = await userService.findUserById(args);

        // then
        expect(mockStore.userRepo.findById).toHaveBeenLastCalledWith(args.id);
        expect(user).toStrictEqual({ id: 1 });
    });
});

describe('[UserService.findAllUsers]', () => {
    it('Should successfully find all users', async () => {
        // given
        const expectedUsers = [{ id: 1 }, { id: 2 }];
        mockStore.userRepo.findAll.mockReturnValueOnce(expectedUsers);

        // when
        const users = await userService.findAllUsers(expectedUsers);

        // then
        expect(mockStore.userRepo.findAll).toHaveBeenLastCalledWith();
        expect(users).toStrictEqual(expectedUsers);
    });
});

describe('[UserService.getMe]', () => {
    it('Should return null when there is no parsedToken', async () => {
        // given
        userService.context.req.parsedToken = null;

        // when
        const user = await userService.getMe();

        // then
        expect(user).toStrictEqual(null);
    });

    it('Should successfully get user from token and return', async () => {
        // given
        const expectedUser = { id: 1, name: 'test user' };
        userService.context.req.parsedToken = { id: expectedUser.id };
        mockStore.userRepo.findById.mockReturnValueOnce(expectedUser);

        // when
        const user = await userService.getMe();

        // then
        expect(user).toStrictEqual(expectedUser);
    });
});

describe('[UserService.register]', () => {
    it('Should fail if email already exists', async () => {
        // given
        const args = {
            registerInput: {
                username: 'name',
                email: 'email@gmail.com',
                password: '123456',
            },
        };
        const existingUser = { email: args.registerInput.email };
        mockStore.userRepo.findOne.mockReturnValueOnce(existingUser);

        // then
        await expect(async () => {
            await userService.register(args);
        }).rejects.toThrow('Email already exists');
    });

    it('Should hash password', async () => {
        /// given
        const args = {
            registerInput: {
                username: 'name',
                email: 'email@gmail.com',
                password: '123456',
            },
        };
        userService.generateToken = jest.fn();
        userService.context.res = { cookie: () => {} };
        bcrypt.hash.mockReturnValueOnce('hashedPassword');

        // when
        await userService.register(args);

        // then
        const hashedPassword = mockStore.userRepo.insert.mock.calls[0][2];
        expect(hashedPassword).toBe('hashedPassword');
    });

    it('Should generate token and attach to cookie', async () => {
        /// given
        const userId = 1;
        const args = {
            registerInput: {
                username: 'name',
                email: 'email@gmail.com',
                password: '123456',
            },
        };
        mockStore.userRepo.insert.mockReturnValueOnce({
            ...args.registerInput,
            _id: userId,
        });
        userService.context.res = { cookie: jest.fn() };
        jwt.sign.mockReturnValueOnce('someToken');

        // when
        await userService.register(args);

        // then
        const token = userService.context.res.cookie.mock.calls[0][1];
        const cookieConfig = userService.context.res.cookie.mock.calls[0][2];

        expect(token).toBe('someToken');
        expect(cookieConfig).toEqual({
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 3, // 3 hours cookies
        });
    });

    it('Should return user', async () => {
        /// given
        const userId = 1;
        const args = {
            registerInput: {
                username: 'name',
                email: 'email@gmail.com',
                password: '123456',
            },
        };
        userService.generateToken = jest.fn();
        userService.context.res = { cookie: () => {} };
        mockStore.userRepo.insert.mockReturnValueOnce({
            ...args.registerInput,
            _id: userId,
        });

        // when
        const user = await userService.register(args);

        // then
        expect(user).toEqual({
            ...args.registerInput,
            _id: userId,
        });
    });
});

describe('[UserService.login]', () => {
    it('Should fail if no user exists with the given email', async () => {
        // given
        const args = {
            loginInput: {
                email: 'email@gmail.com',
                password: '123456',
            },
        };
        mockStore.userRepo.findOne.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await userService.login(args);
        }).rejects.toThrow('Invalid credentials');
    });

    it('Should fail if password is incorrect', async () => {
        // given
        const args = {
            loginInput: {
                email: 'email@gmail.com',
                password: '123456',
            },
        };
        mockStore.userRepo.findOne.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await userService.login(args);
        }).rejects.toThrow('Invalid credentials');
    });

    it('Should generate token and attach to cookie', async () => {
        /// given
        const userId = 1;
        const args = {
            loginInput: {
                username: 'name',
                email: 'email@gmail.com',
                password: '123456',
            },
        };
        mockStore.userRepo.insert.mockReturnValueOnce({
            ...args.loginInput,
            _id: userId,
        });
        mockStore.userRepo.findOne.mockReturnValueOnce({ id: userId });
        userService.context.res = { cookie: jest.fn() };
        jwt.sign.mockReturnValueOnce('someToken');
        bcrypt.compare.mockReturnValueOnce(true);

        // when
        await userService.login(args);

        // then
        const token = userService.context.res.cookie.mock.calls[0][1];
        const cookieConfig = userService.context.res.cookie.mock.calls[0][2];

        expect(token).toBe('someToken');
        expect(cookieConfig).toEqual({
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 3, // 3 hours cookies
        });
    });

    it('Should return user', async () => {
        /// given
        const userId = 1;
        const args = {
            registerInput: {
                username: 'name',
                email: 'email@gmail.com',
                password: '123456',
            },
        };
        userService.generateToken = jest.fn();
        userService.context.res = { cookie: () => {} };
        mockStore.userRepo.insert.mockReturnValueOnce({
            ...args.registerInput,
            _id: userId,
        });

        // when
        const user = await userService.register(args);

        // then
        expect(user).toEqual({
            ...args.registerInput,
            _id: userId,
        });
    });
});

describe('[UserService.logout]', () => {
    it('Should set token expiration date to Thu, 01 Jan 1970', async () => {
        // given
        userService.context.res = { cookie: jest.fn() };

        // when
        await userService.logout();

        // then
        const token = userService.context.res.cookie.mock.calls[0][1];
        const cookieConfig = userService.context.res.cookie.mock.calls[0][2];

        expect(token).toBe('');
        expect(cookieConfig).toEqual({
            httpOnly: true,
            expires: new Date(0), // Thu, 01 Jan 1970
        });
    });
});

describe('[UserService.updateUser]', () => {
    it('Should fail if not specify old password', async () => {
        // given
        const user = { _id: 1 };
        const args = {
            username: 'name',
            oldPassword: null,
            password: 'abcd',
        };
        mockStore.userRepo.findById.mockReturnValueOnce(user);

        // then
        await expect(async () => {
            await userService.updateUser(args);
        }).rejects.toThrow('Please re-enter your password');
    });

    it('Should fail if old password is incorrect', async () => {
        // given
        const user = { _id: 1 };
        const args = {
            username: 'name',
            oldPassword: 'old password',
            newPassword: 'abcd',
        };
        mockStore.userRepo.findById.mockReturnValueOnce(user);

        // then
        await expect(async () => {
            await userService.updateUser(args);
        }).rejects.toThrow('Wrong password');
    });

    it('Should update username and password', async () => {
        // given
        const user = { id: 1 };
        const args = {
            username: 'name',
            oldPassword: 'old password',
            newPassword: 'abcd',
        };
        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.userRepo.updateById.mockReturnValueOnce({
            _doc: { name: args.username },
            _id: 1,
        });
        bcrypt.compare.mockReturnValueOnce(true);
        bcrypt.hash.mockReturnValueOnce('hashPassword');

        // when
        await userService.updateUser(args);

        // then
        expect(mockStore.userRepo.updateById.mock.calls[0][0]).toBe(user.id);
        expect(mockStore.userRepo.updateById.mock.calls[0][1]).toEqual({
            username: args.username,
            password: 'hashPassword',
        });
    });

    it('Should return user', async () => {
        /// given
        const userId = 1;
        const args = {
            registerInput: {
                username: 'name',
                email: 'email@gmail.com',
                password: '123456',
            },
        };
        userService.generateToken = jest.fn();
        userService.context.res = { cookie: () => {} };
        mockStore.userRepo.insert.mockReturnValueOnce({
            ...args.registerInput,
            _id: userId,
        });

        // when
        const user = await userService.register(args);

        // then
        expect(user).toEqual({
            ...args.registerInput,
            _id: userId,
        });
    });
});
