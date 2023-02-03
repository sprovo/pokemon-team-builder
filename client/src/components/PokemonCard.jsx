import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import Image from 'next/image';

export function PokemonCard({ pokemon, removePokemon }) {
    const { name, order, sprite, types = [] } = pokemon;
    return (
        <div className="bg-slate-600 p-4 rounded-xl flex-col justify-center items-center drop-shadow-lg blue-md">
            <h2 className="text-center text-slate-200">{name}</h2>
            <button onClick={() => removePokemon(pokemon)}>X</button>
            <Image
                priority
                src={sprite}
                alt={`A front view sprite of ${name}.`}
                width={150}
                height={150}
            />
            <p className="text-xs text-center mt-4 mb-4 text-slate-800">
                #{order}
            </p>
            <div className="flex gap-4 justify-center text-slate-200">
                {types.map((type) => {
                    const pokemonType = capitalizeFirstLetter(type);

                    return <p key={`${order}-${type}`}>{pokemonType}</p>;
                })}
            </div>
        </div>
    );
}
