export function parsePokedexEntry(entry) {
    return {
        entryNumber: entry?.entry_number,
        name: entry?.pokemon_species?.name,
    };
}
