import http from 'http';

import { expressMiddleware } from '@apollo/server/express4';
import express, { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { context, createApolloServer } from './graphql/server.js';

const app = express();
const httpServer = http.createServer(app);
// Initializes the apollo server
const server = createApolloServer(httpServer);
// Ensure we wait for our server to start
await server.start();

app.use(
    '/',
    cors<Request>(),
    bodyParser.json(),
    expressMiddleware(server, context),
);

// Modified server startup
await new Promise<void>((resolve) => {
    httpServer.listen({ port: 4000 }, resolve);
});
console.log('🚀 Server ready at http://localhost:4000/');
