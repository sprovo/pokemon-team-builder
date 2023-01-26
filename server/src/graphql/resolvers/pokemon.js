export const pokemonResolvers = {
    Queries: {
        getPokemon: async (_, args, { models }) => {
            const { name } = args;
            const pokemon = await models.Pokemon.getPokemon(name);
            return pokemon;
        },
    },
};
