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

export const PokemonTypes = `
	type PokemonType {
		name: String!
		url: String!
	}

	type PokemonTypes {
		count: Int!
		types: [PokemonType]!
	}
`;

export const PokemonGameGenerations = `
	type GameGeneration {
		name: String!
		url: String!
	}

	type PokemonGameGenerations {
		count: Int!
		generations: [GameGeneration]!
	}
`;
