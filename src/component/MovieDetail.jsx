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
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
                },
                params: {
                    language: 'ko-KR',
                },
            });
            setMovie(response.data);
        };
        fetchMovie();
    }, [id]);

    if (!movie) return <div className="text-center mt-10 text-white text-2xl">로딩 중...</div>;

    return (
        <div className="bg-black text-white min-h-screen">
            
            <div className="relative w-full h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-6xl mx-auto w-full">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-yellow-400 text-lg">⭐ {movie.vote_average.toFixed(1)} / 10</span>
                        <span className="text-gray-400 text-lg">| {new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    <a
                        href={`https://www.imdb.com/title/${movie.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all"
                    >
                        IMDb에서 더 보기
                    </a>
                </div>
            </div>

            {/* 영화 상세 정보 섹션 */}
            <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-12 -mt-20">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* 포스터 이미지 */}
                    <div className="w-full md:w-1/3">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* 영화 정보 */}
                    <div className="md:w-2/3 space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">줄거리</h2>
                            <p className="leading-relaxed text-gray-300">
                                {movie.overview || '줄거리가 제공되지 않습니다.'}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">정보</h2>
                            <p className="text-gray-300">
                                <span className="font-semibold text-white">개봉일:</span> {movie.release_date}
                            </p>
                            <p className="text-gray-300">
                                <span className="font-semibold text-white">장르:</span> {movie.genres.map(g => g.name).join(', ')}
                            </p>
                            <p className="text-gray-300">
                                <span className="font-semibold text-white">러닝타임:</span> {movie.runtime}분
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;