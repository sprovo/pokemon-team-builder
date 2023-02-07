import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { generatePokemonUtils } from './models/PokemonUtils.js';
import { generatePokemonModel } from './models/Pokemon.js';
import { pokemonUtilResolvers } from './resolvers/pokemonUtils.js';
import { pokemonResolvers } from './resolvers/pokemon.js';
import {
    Pokemon,
    PokedexEntry,
    PokemonTypes,
    PokemonGameGenerations,
} from './schema.js';

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
        typeDefs: `
            ${Pokemon}
            ${PokedexEntry}
            ${PokemonTypes}
            ${PokemonGameGenerations}

            type Query {
                getPokemon(name: String): Pokemon
                getNationalPokedex: [PokedexEntry]
                getPokemonTypes: PokemonTypes
                getGameGenerations: PokemonGameGenerations
            }
        `,
        resolvers: {
            Query: {
                getPokemon: pokemonResolvers.Queries.getPokemon,
                getNationalPokedex:
                    pokemonUtilResolvers.Queries.getNationalPokedex,
                getPokemonTypes: pokemonResolvers.Queries.getPokemonTypes,
                getGameGenerations:
                    pokemonUtilResolvers.Queries.getGameGenerations,
            },
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    return server;
}
