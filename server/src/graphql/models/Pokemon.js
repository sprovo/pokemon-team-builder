import axios from 'axios';

import { db } from '../../db.js';
import { checkCache } from '../../utils/checkCache.js';
import fetchAsync from '../../utils/fetchAsync.js';
import parsePokemonObject from '../../utils/parsePokemonObject.js';

export function generatePokemonModel() {
    return {
        getPokemon: async (name) => {
            const pokemonPromise = new Promise((resolve, reject) => {
                axios(`${db.pokemon}/${name}`)
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
        getPokemonTypes: async () => {
            const typesCached = await checkCache('pokemonTypes', async () => {
                const data = await axios(`${db.types}`).catch((err) => err);
                return data;
            });

            if (!typesCached) {
                // TODO: Handle Error
                console.error('Pokemon types cannot be found.');
                return {
                    count: null,
                    types: null,
                };
            }

            const types = {
                count: typesCached?.count || 0,
                types: typesCached?.results || [],
            };

            return types;
        },
    };
}
