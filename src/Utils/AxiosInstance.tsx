import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3003',
    timeout: 5000,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Barer ${token}`;
        }
        return config
    },
    (error) => {
        return error;
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error('Unauthorized! Redirecting to login...');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }

)

export default axiosInstance
