import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
    query GetPokemon($name: String) {
        getPokemon(name: $name) {
            name
            order
            sprite
            types
        }
    }
`;
