import httpClient from "@/utils/httpClient";
import { useEffect, useState } from "react";

interface FetchDataParams {
  endpoint: string;
  queryParams?: Record<string, string>;
  accessToken?: string;
}

interface FetchDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useFetchData = <T>({ endpoint, queryParams, accessToken }: FetchDataParams): FetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let headers: Record<string, string> = { "Content-Type": "application/json" };
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }

        let url = endpoint;
        if (queryParams) {
          const params = new URLSearchParams(queryParams).toString();
          url += `?${params}`;
        }

        const response = await httpClient.get<T>(url, { headers });
        setData(response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, accessToken]);

  return { data, isLoading, error };
};
