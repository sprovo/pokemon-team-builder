export const Pokemon = `
	type Pokemon {
		name: String!
		order: Int
		sprite: String
		types: [String!]
	}
`;

export const PokedexEntry = `
	type PokedexEntry {
		entryNumber: Int!
		name: String!
	},
`;
