'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_NATIONAL_POKEDEX } from '../graphql/queries/getNationalPokedex';
import { useDebounce } from '../hooks/useDebounce';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

export function Searchfield({ searchPokemon, disabled }) {
    const [nationalPokedex, setNationalPokedex] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const debouncedSearchString = useDebounce(searchString, 500);

    const { data, loading, error } = useQuery(GET_NATIONAL_POKEDEX, {
        fetchPolicy: 'cache-first',
    });

    function handleInputChange(event) {
        const { value } = event.target;

        // Resets the search results when the input is emptied via keyboard
        if (!value) {
            setSearchResults([]);
        }

        setSearchString(value);
    }

    function clearSearchInput() {
        setSearchString('');
        setSearchResults([]);
    }

    function handleSearchItemClick(name) {
        console.log('name', name);

        searchPokemon(name);
        clearSearchInput();
    }

    useEffect(() => {
        if (data) {
            setNationalPokedex(data.getNationalPokedex);
        }
    }, [data]);

    useEffect(() => {
        if (!debouncedSearchString) return;
        let matches = [];

        // Loops over an array of pokedex entries to find names matching the searched term.
        for (const entry of nationalPokedex) {
            if (matches.length === 8) break;

            if (entry.name.includes(debouncedSearchString)) {
                matches.push(entry);
            }
        }

        setSearchResults(matches);
    }, [debouncedSearchString, nationalPokedex]);

    return (
        <>
            <div className="flex gap-8 relative">
                <input
                    onChange={handleInputChange}
                    className="py-2 px-4 rounded-xl w-96"
                    type="text"
                    name="pokemon-name"
                    value={searchString}
                    placeholder={
                        loading ? 'Loading...' : "Enter a pokemon's name here"
                    }
                    disabled={loading || error || disabled}
                />
                <button
                    className="text-slate-200 py-2 w-36 rounded-xl bg-slate-600"
                    onClick={() => searchPokemon(searchString)}
                    disabled={disabled}
                >
                    Search
                </button>
                <button
                    className="text-slate-200 py-2 w-36 rounded-xl bg-slate-600"
                    onClick={clearSearchInput}
                    disabled={disabled}
                >
                    Clear
                </button>
                {searchResults.length > 0 && (
                    <ul className="absolute top-12 back py-2 rounded-xl w-96 bg-slate-600 z-50 shadow-2xl">
                        {searchResults.map((pokedexEntry) => {
                            const { name, entryNumber } = pokedexEntry;
                            return (
                                <li
                                    key={entryNumber}
                                    className="py-2 px-4 flex justify-between cursor-pointer"
                                    onClick={() => handleSearchItemClick(name)}
                                >
                                    <p>{capitalizeFirstLetter(name)}</p>
                                    <p>{entryNumber}</p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            {error && <span>{error.message}</span>}
        </>
    );
}
