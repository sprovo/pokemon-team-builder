import './reset.css';
import './globals.css';
import { ApolloProvider } from '../graphql/apollo';

export default function RootLayout({ children }) {
    return (
        <ApolloProvider>
            <html lang="en">
                <head />
                <body className="bg-slate-900">{children}</body>
            </html>
        </ApolloProvider>
    );
}
