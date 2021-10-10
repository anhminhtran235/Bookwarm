const { ApolloClient, createHttpLink } = require('@apollo/client/core');

const { FIND_BOOKS_QUERY } = require('./graphql');

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/',
    credentials: 'include',
});

const client = new ApolloClient({
    link: httpLink,
    onError: (e) => {
        console.log(e);
    },
});

describe('Get books', () => {
    it('Get all books', async () => {
        const result = await client.query({
            query: FIND_BOOKS_QUERY,
            variables: {
                criteria: {},
                skip: 0,
                limit: 5,
            },
        });
        console.log(result);
    });
});
