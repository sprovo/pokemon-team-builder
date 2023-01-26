import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { generatePokemonModel } from './models/Pokemon.js';
import { pokemonResolvers } from './resolvers/pokemon.js';
import { Pokemon } from './schema.js';

// Server context
export const context = {
    context: async () => ({
        models: {
            Pokemon: generatePokemonModel(),
        },
    }),
};

// Server initializer
export function createApolloServer(httpServer) {
    const server = new ApolloServer({
        typeDefs: `
            ${Pokemon}

            type Query {
                getPokemon(name: String): Pokemon
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
