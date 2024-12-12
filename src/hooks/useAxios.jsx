import { useState, useEffect } from 'react';
import axiosHeader from '../helpers/axiosHeader';
import axiosPublic from '../helpers/axiosPublic';

function useAxios(url, method = 'GET', body = null, useHeader = false) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const axiosInstance = useHeader ? axiosHeader : axiosPublic;
                const response = await axiosInstance({
                    url,
                    method,
                    data: body
                });
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url, method, body, useHeader]);

    return { data, loading, error };
}

export default useAxios;
