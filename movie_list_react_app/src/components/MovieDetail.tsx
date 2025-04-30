import {useEffect, useState} from 'react';
import ky from 'ky';
import NavBar from "./NavBar.tsx";

async function fetchMovieDetail(): Promise<any> {
    const data = await ky('/movieDetailData.json').json<any>();
    return {
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        title: data.title,
        vote_average: data.vote_average,
        overview: data.overview,
        genre: data.genres?.map((g: any) => g.name).join(', ')
    };
}

export default function MovieDetail() {

    const [movie, setMovie] = useState<any>(null);

    useEffect(() => {
        fetchMovieDetail().then(setMovie);
    }, []);

    if (!movie) return <div>로딩 중...</div>;

    return (
        <>
            <NavBar/>
            <div className="p-8 flex flex-col md:flex-row gap-6">
                <img src={movie.poster} alt={movie.title} className="w-full md:w-1/3 h-auto rounded-lg shadow-md"/>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2 flex items-center justify-between">
                        {movie.title}
                        <span className="text-black text-xl ml-4"> {movie.vote_average}</span>
                    </h1>
                    <p className="text-sm text-gray-600 mb-4">{movie.genre}</p>
                    <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
                </div>
            </div>
        </>
    );
}