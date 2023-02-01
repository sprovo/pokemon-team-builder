export const pokedexResolvers = {
    Queries: {
        getNationalPokedex: async (_, args, { models }) => {
            const nationalPokedex = await models.Pokedex.getNationalPokedex();
            return nationalPokedex;
        },
    },
};
