import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    ApolloProvider,
} from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000',
    credentials: 'include',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

const Provider = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Provider;
