export const PokemonGameGenerations = /* GraphQL */ `
    type GameGeneration {
        name: String!
        url: String!
    }

    type PokemonGameGenerations {
        count: Int!
        generations: [GameGeneration]!
    }

    extend type Query {
        getGameGenerations: PokemonGameGenerations
    }
`;
