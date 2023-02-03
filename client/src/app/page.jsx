'use client';

import { PokemonCard } from '@/components/PokemonCard';
import styles from './page.module.css';
import { Searchfield } from '@/components/SearchField';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_POKEMON } from '@/graphql/queries/getPokemon';

export default function Home() {
    const [pokemonTeam, setPokemonTeam] = useState([]);
    const [loadPokemon, { called, loading, data }] = useLazyQuery(GET_POKEMON);
    const isFullTeam = pokemonTeam.length === 6;

    async function searchPokemon(name) {
        if (isFullTeam) return;
        loadPokemon({ variables: { name: name.toLowerCase() } });
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
        <main
            className={
                (styles.main,
                'w-screen h-screen p-8 flex gap-16 flex-col  items-center')
            }
        >
            <h1 className="text-white">Pokemon Team Builder</h1>
            <Searchfield searchPokemon={searchPokemon} disabled={isFullTeam} />
            {called && loading ? (
                <h1>Loading...</h1>
            ) : (
                <section className="flex gap-8 p-8 flex-wrap items-center justify-center">
                    {pokemonTeam.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.name}
                            pokemon={pokemon}
                            removePokemon={removePokemon}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}
