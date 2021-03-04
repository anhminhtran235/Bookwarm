import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    ApolloProvider,
} from '@apollo/client';

import { onError } from 'apollo-link-error';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000',
    credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const client = new ApolloClient({
    link: httpLink.concat(errorLink),
    cache: new InMemoryCache(),
});

const Provider = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Provider;
