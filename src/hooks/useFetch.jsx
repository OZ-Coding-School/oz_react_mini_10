import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// API 클라이언트 생성
const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_API_TMDB_MOVIES_KEY,
  },
});

// 검색 또는 인기 영화 가져오기
export function useSearchOrPopularVideos(keyword) {
  return useQuery({
    queryKey: ["videos", keyword],
    queryFn: async () => {
      return keyword ? search(keyword) : popular();
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선도 유지
    retry: 1,
  });

  // 검색 기능
  async function search(keyword) {
    try {
      const response = await apiClient.get("/search/movie", {
        params: {
          language: "ko-KR",
          query: keyword,
          include_adult: false,
          page: 1,
        },
      });
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Search API Error:",
          error.response?.data || error.message
        );
        throw new Error(`데이터 처리 실패: ${error.message}`);
      } else {
        console.error("Unknown Error:", error);
        throw new Error("알 수 없는 에러가 발생했습니다.");
      }
    }
  }

  // 인기 영화 가져오기
  async function popular() {
    try {
      const response = await apiClient.get("/movie/popular", {
        params: {
          language: "ko-KR",
          page: 1,
        },
      });
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Popular API Error:",
          error.response?.data || error.message
        );
        throw new Error(`데이터 처리 실패: ${error.message}`);
      } else {
        console.error("Unknown Error:", error);
        throw new Error("알 수 없는 에러가 발생했습니다.");
      }
    }
  }
}

// 포스터 이미지 URL 생성
export const getPostImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/500x750?text=이미지+없음";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  return `${IMAGE_BASE_URL}${path}`;
};

// 영화 상세 정보 가져오기
export const useMovieDetailResult = (watchId) => {
  return useQuery({
    queryKey: ["detail", watchId],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`/movie/${watchId}`, {
          params: {
            language: "ko-KR",
            append_to_response: "credits,videos,similar",
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Detail API Error:",
            error.response?.data || error.message
          );
          throw new Error(`상세 정보 처리 실패: ${error.message}`);
        } else {
          console.error("Unknown Error:", error);
          throw new Error("알 수 없는 에러가 발생했습니다.");
        }
      }
    },
    enabled: !!watchId, // MovieID가 존재할 때만 쿼리 실행
    staleTime: 1000 * 60 * 30, // 30분 동안 데이터 유지
  });
};
