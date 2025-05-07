import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import {fetchMovies, Movie} from "../Data/MovieData.ts";
import {LoadingPage} from "../Loading/LoadingPage.tsx";

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
        return <LoadingPage message="영화 데이터를 불러오는 중입니다..." />;
    }


    if (movies.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg text-gray-600">표시할 영화가 없습니다.</div>
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