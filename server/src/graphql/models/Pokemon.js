import { db } from '../../db.js';

// await fetch(`${db.getPokemon}/${name}`)

export function generatePokemonModel() {
    return {
        getPokemon: async (name) => name,
    };
}
