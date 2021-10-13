const {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} = require('@apollo/client/core');
const fetch = require('cross-fetch');
const ObjectId = require('mongodb').ObjectID;

const {
    FIND_BOOKS_QUERY,
    SINGLE_BOOK_QUERY,
    ADD_BOOK_MUTATION,
} = require('./graphql');
const Book = require('../../../models/Book');
const User = require('../../../models/User');
const connectToDb = require('../../../db/mongoose');
const {
    areBookArrayEquals,
    areBookEquals,
} = require('../../../__test__/testUtil');

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
    onError: (e) => {
        console.log(e);
    },
});

let mongo;
beforeAll(async () => {
    mongo = connectToDb();
});

afterAll(async () => {
    await mongo.connection.close();
});

let books;

beforeEach(async () => {
    await User.deleteMany();
    await Book.deleteMany();
    const user = new User({
        username: 'abc',
        email: 'abc@gmail.com',
        password: '123',
    });
    await user.save();

    books = [];
    for (let i = 0; i < 5; i++) {
        const book = new Book({
            seller: user._id,
            title: 'book' + i,
            subtitle: 'subtitle' + i,
            description: 'description' + i,
            author: 'author' + i,
            shortDescription: 'shortDescription' + i,
            image: 'image' + i,
            price: 10,
            promotion: 20,
        });
        await book.save();
        books.push(book);
    }
});

describe('Get books', () => {
    it('Get 2 most recently added books', async () => {
        const result = await client.query({
            query: FIND_BOOKS_QUERY,
            variables: {
                skip: 0,
                limit: 2,
            },
        });

        const resultBooks = [...result.data.findBooks];
        resultBooks.sort((book1, book2) =>
            book1.title.localeCompare(book2.title)
        );

        expect(areBookArrayEquals(books.slice(3, 5), resultBooks)).toBe(true);
    });

    it('Get 3 oldest books', async () => {
        const result = await client.query({
            query: FIND_BOOKS_QUERY,
            variables: {
                skip: 2,
                limit: 3,
            },
        });

        const resultBooks = [...result.data.findBooks];
        resultBooks.sort((book1, book2) =>
            book1.title.localeCompare(book2.title)
        );

        expect(areBookArrayEquals(books.slice(0, 3), resultBooks)).toBe(true);
    });

    it('Get book that matches criteria', async () => {
        const result = await client.query({
            query: FIND_BOOKS_QUERY,
            variables: {
                titleContains: 'book1',
                skip: 0,
                limit: 100,
            },
        });

        const resultBooks = [...result.data.findBooks];
        resultBooks.sort((book1, book2) =>
            book1.title.localeCompare(book2.title)
        );

        expect(areBookArrayEquals(books.slice(1, 2), resultBooks)).toBe(true);
    });
});

describe('Find book by id', () => {
    it('Find book by id successfully', async () => {
        const result = await client.query({
            query: SINGLE_BOOK_QUERY,
            variables: {
                id: books[0].id,
            },
        });

        const resultBook = result.data.findBookById;
        expect(areBookEquals(resultBook, books[0])).toBe(true);
    });

    it('Find book by id no book found', async () => {
        const result = await client.query({
            query: SINGLE_BOOK_QUERY,
            variables: {
                id: ObjectId().toString(),
            },
        });

        const resultBook = result.data.findBookById;
        expect(resultBook).toBe(null);
    });
});
