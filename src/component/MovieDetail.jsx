import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { results as allMovies } from '../data/movieListData.json';
import genresList from '../data/genresList.json';
import styled from 'styled-components';


const MovieDetail = () => {
    const { id } = useParams(); // URL에서 id 가져오기
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // allMovies 배열에서 URL의 id와 일치하는 영화 찾기
        const foundMovie = allMovies.find((m) => String(m.id) === String(id));

        if (foundMovie) {
            setMovie(foundMovie); // 찾은 영화 데이터로 상태 업데이트
        } else {
            console.warn(`Movie with ID ${id} not found.`);
            setMovie(null);
        }

        setLoading(false);

    }, [id]); // id가 변경될 때마다 useEffect 실행

    // 영화 데이터를 불러오는 중이거나 찾지 못한 경우 처리
    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중 표시
    }

    if (!movie) {
        return <div>영화를 찾을 수 없습니다.</div>; // 영화를 찾지 못한 경우 표시
    }

    // 영화 데이터를 성공적으로 찾았다면, 상태에서 데이터를 가져와 사용
    const { backdrop_path, poster_path, title, vote_average, genre_ids, overview } = movie;

    // 배경 이미지 URL 생성
    const backgroundImageUrl = movie?.backdrop_path ? `${baseUrl}${movie.backdrop_path}` : 'none';

    const Background = styled.div`
        position: fixed;
        inset: 0;
        background-image: ${({ imageUrl }) => `url(${imageUrl})`};
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        filter: grayscale(100%);
        z-index: -1;
    `;

    return (
        <>
            <div className="fixed inset-0 bg-cover bg-center bg-no-repeat grayscale z-[-1]">
                <Background imageUrl={backgroundImageUrl} />
            </div>

            <div className="flex justify-center items-center min-h-screen">
                <div className="relative p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-end rounded-lg backdrop-blur-[50px]">

                    {/* 포스터 이미지 */}
                    <img src={`${baseUrl}${poster_path || backdrop_path}`} alt={title}
                    className="w-full h-auto md:w-[300px] md:h-[450px] object-cover rounded-[8px] mb-[24px] md:mb-0 md:mr-[24px] relative" />

                    {/* 오른쪽 영역: 영화 상세 정보 */}
                    <div className='flex-1 flex flex-col relative p-4 rounded-[8px] justify-center'>

                        <div className="flex items-center mb-[16px]">
                            {/* 제목 영역 */}
                            <h1 className="text-[30px] font-bold mr-[16px]">{title}</h1>
                            {/* 평점 영역 */}
                            <div className='flex items-center text-lg'>
                                <p className='text-yellow-500 mr-[5px]'>★</p>
                                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                            </div>
                        </div>

                        {/* 장르 영역 */}
                        {genre_ids && Array.isArray(genre_ids) && genre_ids.length > 0 ? (
                        <div className="flex flex-wrap gap-[8px] my-[8px]">
                            {genre_ids.map((genreId) => {
                                const genre = genresList.find(g => g.id === genreId);
                                return genre ? (
                                    <span key={genreId} className="px-[12px] py-[4px] bg-gray-200 rounded-full text-sm">
                                        {genre.name}
                                    </span>
                                ) : null;
                            })}
                        </div>
                        ) : (
                            <p className="text-sm text-gray-200">장르 정보 없음</p>
                        )}
                         {/* 줄거리 영역 */}
                        <p className="text-gray-200 mt-4 text-base">{overview}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetail;