import { useState } from 'react';
import axiosHeader from '../helpers/axiosHeader';

function useFetchAccountProfile() {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState({});

    const fetchData = async (key, url) => {
        setError(prev => ({ ...prev, [key]: false }));
        setLoading(prev => ({ ...prev, [key]: true }));
        try {
            const response = await axiosHeader.get(url);
            return response.data;
        } catch (e) {
            if (e.response && e.response.status === 404) {
                console.error(`404 error: No ${key} found: ${url}`);
            } else {
                console.error(e);
                setError(prev => ({ ...prev, [key]: true }));
            }
            return null;
        } finally {
            setLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    return { fetchData, error, loading };
}

export default useFetchAccountProfile;