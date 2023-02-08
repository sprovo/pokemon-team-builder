import axios from 'axios';

import { db } from '../../lib/db.js';
import parsePokemonObject from '../../utils/parsePokemonObject.js';
import { checkCache } from '../../utils/checkCache.js';

export function generatePokemonModel() {
    return {
        getPokemon: async (name) => {
            const cachedPokemon = await checkCache(
                `pokemon:${name}`,
                async () => {
                    const { data: pokemon } = await axios.get(
                        `${db.pokemon}/${name}`,
                    );
                    return parsePokemonObject(pokemon);
                },
            );

            if (cachedPokemon?.success === false) {
                return cachedPokemon?.error;
            }

            return cachedPokemon;
        },
        getPokemonTypes: async () => {
            const fetchedTypes = await checkCache('pokemonTypes', async () => {
                const data = await axios(`${db.types}`).catch((err) => err);
                return data;
            });

            if (fetchedTypes?.success === false) {
                // TODO: Handle Error
                console.error('Pokemon types cannot be found.');
                return {
                    count: null,
                    types: null,
                };
            }

            const types = {
                count: fetchedTypes?.count || 0,
                types: fetchedTypes?.results || [],
            };

            return types;
        },
    };
}
