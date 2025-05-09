import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetail } from '../api/tmdb';

function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = 'https://image.tmdb.org/t/p/w1280';

    useEffect(() => {
        const loadMovie = async () => {
            if (!movieId) {
                console.warn('No movieId found in URL parameters.'); // 개발 시 유용한 경고
                setLoading(false);
                setMovie(null);
                return;
            }

            setLoading(true); // 로딩 시작

            try {
                const data = await fetchMovieDetail(movieId);
                setMovie(data); // 가져온 데이터(영화 상세 정보 객체)를 movie 상태에 저장

            } catch (error) {
                // try 블록 내에서 발생한 에러를 잡아서 처리합니다.
                console.error(`영화 상세 정보 가져오기 오류 (ID: ${movieId}):`, error);
                setMovie(null);

            } finally {
                setLoading(false); // 로딩 종료 (성공 또는 실패)
            }
        };
        loadMovie();

    }, [movieId]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!movie) {
        return <div>영화를 찾을 수 없습니다.</div>; 
    }
    const backgroundImageUrl = movie.backdrop_path ? `${baseUrl}${movie.backdrop_path}` : null;
    const posterImageUrl = movie.poster_path ? `${baseUrl}${movie.poster_path}` : null;

    return (
        <div>
            {backgroundImageUrl && (
                <div className="fixed inset-0 bg-cover bg-center z-[-1] filter grayscale backdrop-blur-[50px] overflow-hidden" style={{ backgroundImage: `url(${backgroundImageUrl})` }} >
                </div>
            )}
            <div className="flex justify-center items-center py-10">
                <div className="relative p-6 max-w-5xl mx-auto flex flex-col md:w-full md:flex-row items-start md:items-center rounded-lg bg-black bg-opacity-80 text-white shadow-2xl"> {/* bg-opacity 70으로 조정, flex-shrink-0 추가 */}
                    {posterImageUrl && (
                        <img
                            src={posterImageUrl}
                            alt={movie.title}
                            className="w-[650px] md:w-[300px] h-[650px] md:h-[450px] object-cover md:object-contain rounded-[8px] mb-6 md:mb-0 md:mr-8"
                        />
                    )}

                    <div className="flex-1">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{movie.title}</h1>
                        <div className="flex items-center text-xl">
                            <p className="text-yellow-400 mr-1">★</p>
                            <p>{typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A'}</p> {/* 평점 없을 시 N/A */}
                        </div>

                        <div className="my-4"> {/* 상하 마진 */}
                            {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map((genre) => (
                                        <span key={genre.id} className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                // 장르 정보가 없을 경우 표시할 메시지입니다.
                                <p className="text-sm text-gray-400">장르 정보 없음</p>
                            )}
                        </div>

                        {/* 줄거리 섹션입니다. */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">줄거리</h2>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;