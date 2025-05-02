import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import {fetchMovies, Movie} from "../Data/MovieData.ts";

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies()
            .then(setMovies)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-300 border-t-transparent rounded-full animate-spin" />
                    <div className="text-lg text-gray-600">영화 목록을 불러오는 중...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
            ))}
        </div>
    );
}