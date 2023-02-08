export const Pokemon = /* GraphQL */ `
    type Pokemon {
        name: String!
        order: Int
        sprite: String
        types: [String!]
    }

    extend type Query {
        getPokemon(name: String): Pokemon
    }
`;
