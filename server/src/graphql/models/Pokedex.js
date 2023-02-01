import axios from 'axios';

import { db } from '../../db.js';
import { checkCache } from '../../utils/checkCache.js';
import { parsePokedexEntry } from '../../utils/parsePokedexEntry.js';

export function generatePokedexModel() {
    return {
        getNationalPokedex: async () => {
            const nationalPokedex = await checkCache(
                'nationalPokedex',
                async () => {
                    const data = await axios.get(`${db.getNationalPokedex}`);
                    return data;
                },
            );

            const pokedexEntries = nationalPokedex?.pokemon_entries || [];
            const parsedPokedexEntries = pokedexEntries.map(
                (entry) => parsePokedexEntry(entry),
                // eslint-disable-next-line function-paren-newline
            );

            console.log(parsedPokedexEntries);

            return parsedPokedexEntries;
        },
    };
}
