import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 4000,
  headers: {
    'Content-type': 'application/ld+json',
    Accept: 'application/ld+json',
  },
});

export default api;
