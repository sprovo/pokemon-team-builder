import axios from 'axios';

import { db } from '../../db.js';
import fetchAsync from '../../utils/fetchAsync.js';
import parsePokemonObject from '../../utils/parsePokemonObject.js';

export function generatePokemonModel() {
    return {
        getPokemon: async (name) => {
            const pokemonPromise = new Promise((resolve, reject) => {
                axios(`${db.getPokemon}/${name}`)
                    .then((payload) => resolve(payload))
                    .catch((err) => reject(err));
            });

            const [{ data: pokemon }, pokemonError] = await fetchAsync(
                pokemonPromise,
            );

            if (pokemonError) {
                return pokemonError;
            }

            // Parse the pokemon object into the shape containing what we need
            const parsedPokemon = parsePokemonObject(pokemon);

            if (!parsedPokemon) {
                return undefined;
            }

            return parsedPokemon;
        },
    };
}
