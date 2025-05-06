import { useEffect, useState } from "react";

export const useFetch = (fetchFunction, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchFunction(options);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, options]);

  return { data, error, isLoading };
};
