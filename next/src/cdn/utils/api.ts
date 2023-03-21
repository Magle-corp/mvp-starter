import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 4000,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
