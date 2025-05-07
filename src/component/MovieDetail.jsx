import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetail } from '../api/tmdb';

function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = 'https://image.tmdb.org/t/p/w1280';

    // 영화 데이터를 가져오는 함수
    useEffect(() => {
        if (!movieId) return;

        setLoading(true); // 로딩 시작

        fetchMovieDetail(movieId) // TMDB API 호출
            .then((data) => {
                setMovie(data); // 영화 데이터 저장
                setLoading(false); // 로딩 종료
            })
            .catch(() => {
                setMovie(null); // 오류 발생 시 영화 데이터 비워줌
                setLoading(false); // 로딩 종료
            });
    }, [movieId]);

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 상태 표시
    }

    if (!movie) {
        return <div>영화를 찾을 수 없습니다.</div>; // 영화가 없을 경우 메시지
    }

    const backgroundImageUrl = `${baseUrl}${movie.backdrop_path}`;
    const posterImageUrl = `${baseUrl}${movie.poster_path}`;

    return (
        <div>
            {/* 배경 이미지 */}
            {backgroundImageUrl && (
                <div className="fixed inset-0 bg-cover bg-center z-[-1] filter grayscale" style={{ backgroundImage: `url(${backgroundImageUrl})` }} >
                </div>
            )}

            {/* 영화 상세 정보 */}
            <div className="flex justify-center items-center py-10">
                <div className="relative p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center rounded-lg bg-black bg-opacity-50 text-white shadow-2xl">

                    {/* 포스터 이미지 */}
                    {posterImageUrl && (
                        <img
                            src={posterImageUrl}
                            alt={movie.title}
                            className="w-[300px] h-[450px] object-cover rounded-[8px] mb-6 md:mb-0 md:mr-8"
                        />
                    )}

                    {/* 영화 상세 정보 */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <div className="flex items-center text-xl">
                            <p className="text-yellow-400 mr-1">★</p>
                            <p>{movie.vote_average.toFixed(1)}</p>
                        </div>

                        {/* 장르 */}
                        <div className="my-4">
                            {movie.genres && movie.genres.length > 0 ? (
                                <div className="flex gap-2">
                                    {movie.genres.map((genre) => (
                                        <span key={genre.id} className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p>장르 정보 없음</p>
                            )}
                        </div>

                        {/* 줄거리 */}
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
