'use client';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider as Provider,
} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

export function ApolloProvider({ children }) {
    return <Provider client={client}>{children}</Provider>;
}
