import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    ApolloProvider,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import alertify from 'alertifyjs';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

import paginationField from '../lib/paginationField';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { transformImage } from '../lib/util';

const { link, useApolloNetworkStatus } = createNetworkStatusNotifier();

function GlobalLoadingIndicator() {
    const status = useApolloNetworkStatus();
    if (status.numPendingMutations > 0) {
        nprogress.start();
        return null;
    } else {
        nprogress.done();
        return null;
    }
}

const apiUrl =
    process.env.NODE_ENV === 'production'
        ? '/graphql'
        : 'http://localhost:5000/graphql';
const httpLink = createHttpLink({
    uri: apiUrl,
    credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            const errorMessage = message.split(': ')[1];
            if (errorMessage) {
                alertify.error(errorMessage);
            } else {
                alertify.error(message);
            }
        });
    }
    if (networkError) {
        alertify.error('Network error: ' + networkError);
    }
});

const client = new ApolloClient({
    link: link.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    findBooks: paginationField(),
                },
            },
            // Book: {
            //     fields: {
            //         image: {
            //             read(image) {
            //                 return transformImage(image, 2, 3);
            //             },
            //         },
            //     },
            // },
        },
    }),
    connectToDevTools: true,
});

const Provider = ({ children }) => (
    <ApolloProvider client={client}>
        <GlobalLoadingIndicator />
        {children}
    </ApolloProvider>
);

export default Provider;
