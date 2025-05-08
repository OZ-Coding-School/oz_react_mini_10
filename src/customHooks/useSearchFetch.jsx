import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchMovieData } from "../RTK/thunk";

export default function useSearchFetch(params) {
  const dispatch = useDispatch();

  useEffect(() => {
    // debounce
    const debounceTimer = setTimeout(() => {
      dispatch(searchMovieData(params)); // thunk 함수실행하여 redux 상태 업데이트
    }, 0);
    return () => clearTimeout(debounceTimer);
  }, [params]);
}
