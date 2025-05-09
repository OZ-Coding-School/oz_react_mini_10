const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
    throw new Error('TMDB API 키가 설정되지 않았습니다.');
}

// 공통 fetch 유틸리티 함수
const fetchFromTMDB = async (path, queryParams = {}) => {
    try {
        const url = new URL(`${BASE_URL}${path}`);
        url.searchParams.append('api_key', API_KEY);
        url.searchParams.append('language', 'ko-KR');

    // 추가 쿼리 파라미터 추가
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`TMDB API 요청 실패. 경로: ${path}, 상태 코드: ${response.status}`);
    }

    return await response.json();

    } catch (error) {
        console.error(`TMDB 요청 오류 (${path}):`, error);
        return null; // 호출 측에서 null 또는 빈 배열 처리
    }
};

// 인기 영화 목록 가져오기
export const fetchPopularMovies = async () => {
    const data = await fetchFromTMDB('/movie/popular', { page: '1' });
    return data?.results || [];
};

// 특정 영화 상세 정보 가져오기
export const fetchMovieDetail = async (movieId) => {
    if (!movieId) {
        console.warn('유효하지 않은 movieId:', movieId);
        return null;
    }

    const data = await fetchFromTMDB(`/movie/${movieId}`);
    return data || null;
};

// 영화 검색 (제목 기준)
export const searchMovies = async (query) => {
    if (!query) {
        console.log('검색어가 비어있습니다. API 호출 안 함.');
        return [];
    }

    const data = await fetchFromTMDB('/search/movie', {
        query: query,
        page: '1',
    });

    return data?.results || [];
};
