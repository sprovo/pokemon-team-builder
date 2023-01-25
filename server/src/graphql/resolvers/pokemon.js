export const pokemonResolvers = {
    Queries: {
        getPokemon: async (_, args, { models }) => {
            const [data, error] = models.Pokemon.getPokemon('charmander');
            if (error) {
                return error;
            }
            return data;
        },
    },
};
