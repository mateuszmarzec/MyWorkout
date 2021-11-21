import baseAxios from 'axios';
const API_URL = "api/"

const instanceTokenizeAxios = baseAxios.create({
    baseURL: API_URL
});

instanceTokenizeAxios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
      Promise.reject(error);
    }
);

instanceTokenizeAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            return instanceTokenizeAxios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken }, {_retry: true})
            .then((res) => {
              if (res.status === 200) {
                localStorage.setItem("accessToken", res.data.access);
                return instanceTokenizeAxios(originalRequest);
              }
            })
            .catch(error => {
                if (error.response.status === 401){
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            });
        }
        return Promise.reject(error);
    }
);

export const axios = baseAxios.create({
    baseURL: API_URL
});

export const tokenizeAxios = instanceTokenizeAxios;