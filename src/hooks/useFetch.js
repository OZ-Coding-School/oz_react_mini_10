import { config } from "@api/common";
import { useEffect, useState } from "react";

export const useFetch = ({ options, query }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = options
          ? await query(config, options)
          : await query(config);

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
  }, [query, options]);

  return { data, error, isLoading };
};
