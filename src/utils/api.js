import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 6000,
});

// Interceptor to inject JWT token in header
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle auth token expiration errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the response returns 401 (Unauthorized) or 403 (Forbidden), we clear invalid tokens
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
