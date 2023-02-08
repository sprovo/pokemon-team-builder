import { Pokemon } from './typedefs/pokemon.js';
import { PokedexEntry } from './typedefs/pokedexEntry.js';
import { PokemonGameGenerations } from './typedefs/pokemonGeneration.js';
import { PokemonTypes } from './typedefs/pokemonType.js';
import { pokemonResolvers } from './resolvers/pokemon.js';
import { pokemonUtilResolvers } from './resolvers/pokemonUtils.js';

// An empty `type Query` is defined so each following type can extend it.
// This collocation allows for easier maintenance of types & their associated queries/mutations.
export const typeDefs = [
    `type Query`,
    Pokemon,
    PokedexEntry,
    PokemonTypes,
    PokemonGameGenerations,
];

export const resolvers = {
    Query: {
        ...pokemonResolvers.Queries,
        ...pokemonUtilResolvers.Queries,
    },
};
