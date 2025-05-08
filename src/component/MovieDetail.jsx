import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                    api_key: 'd7af90757976df4593ed5c6e53168372',
                    language: 'ko-KR',
                }
                }
            );
            setMovie(response.data);
        };
        fetchMovie();
    }, [id]);

    if (!movie) return <div className="text-center mt-10 text-white">로딩 중...</div>;

    return (
        <div className="relative bg-black text-white pt-16">
            
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            ></div>            
            <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-12">                
                <h1 className="text-5xl font-extrabold mb-4 text-center md:text-left">
                    {movie.title}
                </h1>
                <div className="flex flex-col md:flex-row gap-6">                    
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full md:w-1/3 rounded-lg shadow-2xl transform transition-transform hover:scale-105"
                    />
                    
                    <div className="md:w-2/3 space-y-6">                        
                        <p className="text-lg font-semibold">개봉일: {movie.release_date}
                            </p>                       
                        <p className="text-lg font-semibold">평점: {movie.vote_average} / 10                            
                        </p>                       
                        <p className="leading-relaxed text-lg">
                            <span className="font-semibold">줄거리:</span> {movie.overview || '줄거리가 제공되지 않습니다.'}
                        </p>                        
                        <p className="text-lg font-semibold">장르: {movie.genres.map(g => g.name).join(', ')}</p>                        
                        <div className="mt-4">
                            <a
                                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all"
                            >
                                IMDb에서 더 보기
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
