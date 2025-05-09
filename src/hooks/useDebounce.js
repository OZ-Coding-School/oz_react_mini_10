import { useRef } from "react";

export const useDebounce = (callback, delay = 500) => {
  const timer = useRef();

  return (e) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    const newTimer = setTimeout(() => {
      callback(e);
    }, delay);
    timer.current = newTimer;
  };
};
