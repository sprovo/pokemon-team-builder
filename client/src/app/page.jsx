import { PokemonCard } from '@/components/PokemonCard';
import { mockTeam } from '@/mock/mockPokemon';
import { Inter } from '@next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main
            className={
                (styles.main,
                'w-screen h-screen p-8 flex gap-16 flex-col justify-center items-center')
            }
        >
            <div className="flex gap-8">
                <input
                    className="py-2 px-4 rounded-xl w-96"
                    type="text"
                    name="pokemon-name"
                />
                <button className="text-slate-200 py-2 w-36 rounded-xl bg-slate-600">
                    Search
                </button>
            </div>
            <section className="flex gap-8 p-8 flex-wrap items-center justify-center">
                {mockTeam.map((pokemon) => (
                    <PokemonCard pokemon={pokemon} />
                ))}
            </section>
        </main>
    );
}
