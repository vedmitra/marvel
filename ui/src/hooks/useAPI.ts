import { useCallback, useState } from 'react';

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

type ApiHook<T> = {
  loading: boolean;
  error: string | null;
  request: (endpoint: string, options?: RequestOptions) => Promise<T>;
};

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Custom React hook for making API calls using fetch.
 * Handles loading state, error state, and provides a request function.
 *
 * @returns {ApiHook<T>} - An object containing loading state, error state, and the request function.
 */
const useApi = <T>(): ApiHook<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (endpoint: string, options: RequestOptions = {}): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        }

        const data: T = await response.json();
        setLoading(false);
        return data;
      } catch (err) {
        setLoading(false);
        setError((err as Error).message);
        // TODO: Proper error handling components needs to be created.
        throw err;
      }
    },
    []
  );

  return { loading, error, request };
};

export default useApi;
