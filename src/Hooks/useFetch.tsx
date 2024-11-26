import { useState, useCallback, useMemo } from 'react';

export interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

type FetchFunction = (url: string) => Promise<void>;

const useFetch = <T,>(): [FetchFunction, ApiResponse<T>] => {
    const [response, setResponse] = useState<ApiResponse<T>>({
        data: null,
        loading: false,
        error: null
    });

    const fetchData: FetchFunction = useCallback(async (url) => {
        setResponse({ ...response, loading: true });

        try {
            const fetchedData = await fetch(url);
            if (!fetchedData.ok) {
                setResponse({ ...response, loading: false, error: null });
                throw new Error("Network response was not ok");
            }
            const result = await fetchedData.json();
            setResponse({ data: result, loading: false, error: null });
        } catch (error) {
            setResponse({ ...response, loading: false, error: 'An error occured' });
        }
    }, []);

    return useMemo(() => [fetchData, response], [response, fetchData]);
}

export default useFetch;