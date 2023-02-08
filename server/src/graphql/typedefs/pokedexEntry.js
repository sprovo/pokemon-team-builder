export const PokedexEntry = /* GraphQL */ `
    type PokedexEntry {
        entryNumber: Int!
        name: String!
    }

    extend type Query {
        getNationalPokedex: [PokedexEntry]
    }
`;
