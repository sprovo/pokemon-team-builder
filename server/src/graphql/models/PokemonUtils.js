import axios from 'axios';

import { db } from '../../db.js';
import { checkCache } from '../../utils/checkCache.js';
import { parsePokedexEntry } from '../../utils/parsePokedexEntry.js';

export function generatePokemonUtils() {
    return {
        getNationalPokedex: async () => {
            const nationalPokedex = await checkCache(
                'nationalPokedex',
                async () => {
                    const data = await axios
                        .get(`${db.nationalPokedex}`)
                        .catch((err) => err);
                    return data;
                },
            );

            if (!nationalPokedex) {
                // TODO: Handle Error
                console.error('Pokemon types cannot be found.');
                return null;
            }

            const pokedexEntries = nationalPokedex?.pokemon_entries || [];
            const parsedPokedexEntries = pokedexEntries.map(
                (entry) => parsePokedexEntry(entry),
                // eslint-disable-next-line function-paren-newline
            );

            return parsedPokedexEntries;
        },
        getGameGenerations: async () => {
            const gameGenerations = await checkCache(
                'gameGenerations',
                async () => {
                    const data = await axios
                        .get(`${db.gameGenerations}`)
                        .catch((err) => err);
                    return data;
                },
            );

            if (!gameGenerations) {
                // TODO: Handle Error
                console.error('Game generations could not be found.');
                return null;
            }

            const { count = 0, results: generations = [] } = gameGenerations;

            return {
                count,
                generations,
            };
        },
    };
}
