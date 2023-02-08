export const PokemonTypes = /* GraphQL */ `
    type PokemonType {
        name: String!
        url: String!
    }

    type PokemonTypes {
        count: Int!
        types: [PokemonType]!
    }

    extend type Query {
        getPokemonTypes: PokemonTypes
    }
`;
