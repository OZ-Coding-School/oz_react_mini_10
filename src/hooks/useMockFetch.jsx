import { useQuery } from "@tanstack/react-query";

// 데이터 fetching!
const fetchMockMovies = async () => {
  try {
    const response = await fetch("/data/movieListData.json");
    if (!response.ok) throw new Error("에러가 발생하였습니다.");

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("영화 목록 데이터 가져오기 오류 발생:", error);
    throw error;
  }
};

export const useMockMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMockMovies,
    staleTime: 5 * 60 * 1000,
  });
};
