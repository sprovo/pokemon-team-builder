'use client';

import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { Head } from '../src/components/Head';
import { Layout } from '../src/components/containers/Layout';
import { GET_POKEMON } from '../src/graphql/queries/getPokemon';
import { PokemonCard } from '../src/components/PokemonCard';
import { Searchfield } from '../src/components/SearchField';

export default function Home() {
    const [pokemonTeam, setPokemonTeam] = useState([]);
    const [loadPokemon, { called, loading, data }] = useLazyQuery(GET_POKEMON);
    const isFullTeam = pokemonTeam.length === 6;

    function searchPokemon(name) {
        console.log(name, isFullTeam);

        // if (isFullTeam) return;
        // loadPokemon({ variables: { name: name.toLowerCase() } });
    }

    function removePokemon(pokemon) {
        const editedTeam = pokemonTeam.filter(
            (member) => member.order !== pokemon.order,
        );

        setPokemonTeam(editedTeam);
    }

    useEffect(() => {
        if (data && !isFullTeam) {
            // TODO: stash pokemon in teams list in local storage
            // ie: { game: 'Scarlet', team: pokemonTeam }
            setPokemonTeam([...pokemonTeam, data.getPokemon]);
        }
    }, [data]);

    return (
        <Layout>
            <Head />
            <main className="w-screen h-screen p-8 flex gap-16 flex-col  items-center">
                <Searchfield
                    searchPokemon={searchPokemon}
                    disabled={isFullTeam}
                />
                <section className="flex gap-8 p-8 flex-wrap items-center justify-center">
                    {pokemonTeam.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.name}
                            pokemon={pokemon}
                            removePokemon={removePokemon}
                        />
                    ))}
                </section>
            </main>
        </Layout>
    );
}
