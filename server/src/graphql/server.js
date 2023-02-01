import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { generatePokedexModel } from './models/Pokedex.js';
import { generatePokemonModel } from './models/Pokemon.js';
import { pokedexResolvers } from './resolvers/pokedex.js';
import { pokemonResolvers } from './resolvers/pokemon.js';
import { Pokemon, PokedexEntry } from './schema.js';

// Server context
export const context = {
    context: async () => ({
        models: {
            Pokemon: generatePokemonModel(),
            Pokedex: generatePokedexModel(),
        },
    }),
};

// Server initializer
export function createApolloServer(httpServer) {
    const server = new ApolloServer({
        typeDefs: `
            ${Pokemon}
            ${PokedexEntry}

            type Query {
                getPokemon(name: String): Pokemon
                getNationalPokedex: [PokedexEntry]
            }
        `,
        resolvers: {
            Query: {
                getPokemon: pokemonResolvers.Queries.getPokemon,
                getNationalPokedex: pokedexResolvers.Queries.getNationalPokedex,
            },
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    return server;
}
