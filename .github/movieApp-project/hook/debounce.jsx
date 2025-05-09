import { useEffect, useState } from "react"

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
        // delay 후에 debouncedValue 업데이트
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay)
        // value가 바뀌면 타이머 취소하고 새로 설정
    return () => {
        clearTimeout(handler);
      };
    }, [value, delay]); // value 또는 delay가 바뀌면 다시 실행

    return debouncedValue;
    
} 

