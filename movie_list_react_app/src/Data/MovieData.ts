import ky from "ky";

// TMDB API 응답 원형
type RawMovie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    adult: boolean;
    overview: string;
    genres: { id: number; name: string }[];
};

// 렌더링용 타입
export type Movie = {
    id: number;
    title: string;
    poster: string;
    rating: number;
};

export type MovieDetail = {
    id: number;
    title: string;
    overview: string;
    poster: string;
    vote_average: number;
    genres: string[];
};

type ApiResponse = {
    results: RawMovie[];
};

// 환경 변수
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

// TMDB 인기 영화 가져오기
export async function fetchMovies(): Promise<Movie[]> {
    const data = await ky
        .get(`${BASE_URL}/movie/popular`, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            searchParams: {
                language: "ko-KR",
                page: "1",
            },
        })
        .json<ApiResponse>();

    return data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
}

export async function fetchMovieDetail(movieId: string): Promise<MovieDetail> {
    const data = await ky
        .get(`${BASE_URL}/movie/${movieId}`, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            searchParams: {
                language: "ko-KR",
            },
        })
        .json<RawMovie>();

    return {
        id: data.id,
        title: data.title,
        overview: data.overview,
        vote_average: data.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        genres: data.genres.map((g) => g.name),
    };
}