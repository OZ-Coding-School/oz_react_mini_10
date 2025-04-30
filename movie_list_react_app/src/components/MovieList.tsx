import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import ky from "ky";

type Movie = {
    id: number;
    title: string;
    poster: string;
    rating: number;
};

export async function fetchMovies(): Promise<Movie[]> {
    const data = await ky('/movieListData.json').json<any>();
    return data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
}

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetchMovies().then(setMovies);
    }, []);

    return (
        <>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </>

    );
}