import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// useDebounce를 쓰는 이유
// 1. 검색어 입력할때마다 API 요청하면 난 돈이 없어요
// 2. 그래서 useDebounce를 사용  입력멈추고 시간지나면 호출
// 3. 따로 만든 customhook
