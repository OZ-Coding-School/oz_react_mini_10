import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  // Debounced 값을 저장할 상태 변수 선언
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // value가 변경될 때마다 타이머 설정
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup 함수: 다음 effect가 실행되거나 컴포넌트가 언마운트될 때 이전 타이머를 제거
    // 이렇게 하면 마지막 입력 값에 대한 타이머만 남게 됩니다.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value 또는 delay가 변경될 때마다 effect 재실행

  return debouncedValue; // 지연된 값 반환
}

export default useDebounce;