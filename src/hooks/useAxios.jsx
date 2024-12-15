import { useState, useEffect } from 'react';
import axiosHeader from '../helpers/axiosHeader';
import axiosPublic from '../helpers/axiosPublic';

function useAxios(url, method = 'GET', body = null, useHeader = false) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            try {
                const axiosInstance = useHeader ? axiosHeader : axiosPublic;
                const response = await axiosInstance({
                    url,
                    method,
                    data: body,
                    signal
                });
                setData(response.data);
            } catch (err) {
                if (err.name !== 'CanceledError') {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            controller.abort();
        };

    }, [url, method, body, useHeader]);

    return { data, loading, error };
}

export default useAxios;
