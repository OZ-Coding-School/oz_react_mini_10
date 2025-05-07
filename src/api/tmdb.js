const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
        );
        if (!response.ok) {
            throw new Error('인기 영화를 불러오는 데 실패했습니다.');
            // throw new Error()는 강제로 에러를 발생시키는 문법
        }
        const data = await response.json();

        return data.results;
    } catch (error) {
        console.error('인기 영화 가져오기 오류:', error);
        return [];
    }
};

export const fetchMovieDetail = async (movieId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
        );

        if (!response.ok) {
            throw new Error('영화 상세 정보를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();

        return data;

    } catch (error) {
        console.error(`영화 상세 정보 오류 (ID: ${movieId}):`, error);
        return null;
    }
};
