import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// Request Interceptor to add Bearer token
api.interceptors.request.use(
  (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Do not attempt token refresh for auth endpoints or if already retried
    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth/me') ||
      originalRequest?.url?.includes('/auth/refresh-token') ||
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/register');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          '/api/v1/auth/refresh-token',
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data?.data?.accessToken;
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        setAccessToken(null);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
