import { useState, useEffect } from "react";

export const useSwapi = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const characters = await response.json();
        setData(characters);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
};

export const useSwapiAll = (urls: string[]) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const failed = responses.find((r) => !r.ok);
        if (failed) {
          throw new Error(`HTTP error! status: ${failed.status}`);
        }
        const results = await Promise.all(responses.map((res) => res.json()));
        setData(results);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [urls]);

  return { data, error, isLoading };
};
