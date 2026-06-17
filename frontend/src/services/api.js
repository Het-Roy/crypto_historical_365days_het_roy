import axios from 'axios';

const API = axios.create({
  baseURL: 'https://crypto-historical-365days-het-roy.onrender.com',
});

// Add interceptor for auth token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
