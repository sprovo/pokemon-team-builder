import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

interface MyContext {
    token?: string;
}

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<MyContext>({
    typeDefs: `
        type Book {
            title: String
            author: String
        }

        type Query {
            books: [Book]
        }
    `,
    resolvers: {
        Query: {
            books: () => [],
        },
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

app.use('/');
app.use(cors<Request>());
app.use(bodyParser.json());
app.use(
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

// Modified server startup
await new Promise<void>((resolve) => {
    httpServer.listen({ port: 4000 }, resolve);
});
console.log('🚀 Server ready at http://localhost:4000/');
