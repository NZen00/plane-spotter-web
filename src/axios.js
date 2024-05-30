// src/axios.js

import axios from 'axios';
import authService from "./services/authService";

const instance = axios.create({
    baseURL: 'https://localhost:7176/api/',
});

instance.interceptors.request.use(
    (config) => {
        const user = authService.getCurrentUser();
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
