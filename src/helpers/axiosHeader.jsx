import axios from 'axios';

const token = localStorage.getItem('jwt');

const axiosHeader = axios.create({
    baseURL: 'http://localhost:1991',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

export default axiosHeader;