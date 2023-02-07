export const pokemonUtilResolvers = {
    Queries: {
        getNationalPokedex: async (_, __, { models }) => {
            // eslint-disable-next-line operator-linebreak
            const nationalPokedex =
                await models.PokemonUtils.getNationalPokedex();
            return nationalPokedex;
        },
        getGameGenerations: async (_, __, { models }) => {
            // eslint-disable-next-line operator-linebreak
            const gameGenerations =
                await models.PokemonUtils.getGameGenerations();
            return gameGenerations;
        },
    },
};
