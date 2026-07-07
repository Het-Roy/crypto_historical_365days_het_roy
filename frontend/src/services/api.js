import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3000'),
});

// Add interceptor for auth token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Fetch aggregated coin summary (one row per coin with sparkline)
export const fetchCoinSummary = async () => {
  try {
    const { data } = await API.get('/coins/summary');
    return data;
  } catch (error) {
    console.error("Error fetching coin summary:", error);
    return { data: [] };
  }
};

export const fetchAllCoins = async (page = 1, limit = 50) => {
  try {
    const { data } = await API.get(`/coins?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    return { data: [] };
  }
};

export const loginUser = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  return data;
};

export const registerUser = async (email, password) => {
  const { data } = await API.post('/auth/register', { email, password });
  return data;
};

export const fetchUserProfile = async () => {
  try {
    const { data } = await API.get('/auth/profile');
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export default API;
