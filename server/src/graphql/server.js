import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { generatePokemonUtils } from './models/PokemonUtils.js';
import { generatePokemonModel } from './models/Pokemon.js';
import { typeDefs, resolvers } from './schema.js';

// Server context
export const context = {
    context: async () => ({
        models: {
            Pokemon: generatePokemonModel(),
            PokemonUtils: generatePokemonUtils(),
        },
    }),
};

// Server initializer
export function createApolloServer(httpServer) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    return server;
}
