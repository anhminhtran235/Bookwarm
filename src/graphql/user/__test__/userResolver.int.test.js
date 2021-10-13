const {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} = require('@apollo/client/core');
const fetch = require('cross-fetch');
const ObjectId = require('mongodb').ObjectID;

const { REGISTER_USER_MUTATION, LOGIN_MUTATION } = require('./graphql');
const Book = require('../../../models/Book');
const User = require('../../../models/User');
const connectToDb = require('../../../db/mongoose');

const httpLink = createHttpLink({
    uri: `http://localhost:${process.env.PORT}/graphql`,
    credentials: 'include',
    fetch,
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {},
        },
    }),
});

let mongo;
beforeAll(async () => {
    mongo = connectToDb();
});

afterAll(async () => {
    await mongo.connection.close();
});

beforeEach(async () => {
    await User.deleteMany();
    await Book.deleteMany();
});

describe('Register', () => {
    it('Register successfully', async () => {
        const user = {
            username: 'test user',
            email: 'testUser@gmail.com',
            password: '123456',
        };
        const result = await client.mutate({
            mutation: REGISTER_USER_MUTATION,
            variables: {
                ...user,
            },
        });

        const resultUser = { ...result.data.register };

        expect(resultUser.username).toBe(user.username);
        expect(resultUser.email).toBe(user.email);
        expect(resultUser.books).toStrictEqual([]);
        expect(resultUser.cart).toStrictEqual([]);
        expect(resultUser.createdAt).not.toBe(undefined);
        expect(resultUser.password).toBe(undefined);
    });

    it('Register fail - email already exists', async () => {
        const user = {
            username: 'test user',
            email: 'testUser@gmail.com',
            password: '123456',
        };
        await new User(user).save();

        await expect(async () => {
            await client.mutate({
                mutation: REGISTER_USER_MUTATION,
                variables: {
                    ...user,
                },
            });
        }).rejects.toThrow('Email already exists');
    });
});

describe('Login', () => {
    it('Login successfully', async () => {
        const user = {
            username: 'test user',
            email: 'testUser@gmail.com',
            password: '123456',
        };
        await client.mutate({
            mutation: REGISTER_USER_MUTATION,
            variables: {
                ...user,
            },
        });

        const res = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
                email: user.email,
                password: user.password,
            },
        });

        const resultUser = { ...res.data.login };

        expect(resultUser.username).toBe(user.username);
        expect(resultUser.email).toBe(user.email);
        expect(resultUser.books).toStrictEqual([]);
        expect(resultUser.cart).toStrictEqual([]);
        expect(resultUser.createdAt).not.toBe(undefined);
        expect(resultUser.password).toBe(undefined);
    });

    it('Login fail - wrong password', async () => {
        const user = {
            username: 'test user',
            email: 'testUser@gmail.com',
            password: '123456',
        };
        await client.mutate({
            mutation: REGISTER_USER_MUTATION,
            variables: {
                ...user,
            },
        });

        await expect(async () => {
            await client.mutate({
                mutation: LOGIN_MUTATION,
                variables: {
                    email: user.email,
                    password: 'wrong password',
                },
            });
        }).rejects.toThrow('Invalid credentials');
    });

    it('Login fail - wrong email', async () => {
        const user = {
            username: 'test user',
            email: 'testUser@gmail.com',
            password: '123456',
        };
        await client.mutate({
            mutation: REGISTER_USER_MUTATION,
            variables: {
                ...user,
            },
        });

        await expect(async () => {
            await client.mutate({
                mutation: LOGIN_MUTATION,
                variables: {
                    email: 'wrong email',
                    password: user.password,
                },
            });
        }).rejects.toThrow('Invalid credentials');
    });
});
