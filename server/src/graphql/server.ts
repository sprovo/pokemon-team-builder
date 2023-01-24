import http from 'http';

import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';

import resolvers from './resolvers.js';
import schema from './schema.js';

interface ServerContext extends BaseContext {
    token?: string;
}

interface ContextArgs {
    req: ExpressContextFunctionArgument['req'] & {
        headers: {
            token?: string;
        };
    };
    res: ExpressContextFunctionArgument['res'];
}

// Server context
export const context = {
    context: async ({ req }: ContextArgs): Promise<ServerContext> => ({
        token: req.headers?.token || '',
    }),
};

// Server initializer
export function createApolloServer(
    httpServer: http.Server<
        typeof http.IncomingMessage,
        typeof http.ServerResponse
    >,
) {
    const server = new ApolloServer<ServerContext>({
        typeDefs: schema,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    return server;
}
