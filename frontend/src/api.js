import axios from 'axios';

const API = axios.create({ baseURL: 'https://authentication-mongodb-5o3o.vercel.app/api/auth' });

// Ye logic har request ke saath Token khud hi bhej dega
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;