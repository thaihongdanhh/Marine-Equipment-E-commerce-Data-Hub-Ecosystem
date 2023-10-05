/**
 * axios setup to use mock service
 */

import axios from 'axios';

// const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010/' });
const axiosServices = axios.create({ baseURL: 'https://marine-parts.ailab.vn:5002' });
// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
