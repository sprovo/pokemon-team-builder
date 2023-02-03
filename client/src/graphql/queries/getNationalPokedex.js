import { gql } from '@apollo/client';

export const GET_NATIONAL_POKEDEX = gql`
    query GetNationalPokedex {
        getNationalPokedex {
            entryNumber
            name
        }
    }
`;
