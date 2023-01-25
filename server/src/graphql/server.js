import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { generatePokemonModel } from './models/Pokemon.js';
import { pokemonResolvers } from './resolvers/pokemon.js';

// Server context
export const context = {
    context: async ({ req }) => ({
        token: req.headers?.token || '',
        models: {
            Pokemon: generatePokemonModel(),
        },
    }),
};

// Server initializer
export function createApolloServer(httpServer) {
    const server = new ApolloServer({
        typeDefs: `
        type Query {
            getPokemon: String!
        }
    `,
        resolvers: {
            Query: {
                getPokemon: pokemonResolvers.Queries.getPokemon,
            },
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    return server;
}
