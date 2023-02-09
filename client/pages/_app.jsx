import '../src/styles/reset.css';
import '../src/styles/globals.css';

import { ApolloProvider } from '../src/graphql/apollo';

export default function App({ Component, pageProps }) {
    return (
        <ApolloProvider>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
