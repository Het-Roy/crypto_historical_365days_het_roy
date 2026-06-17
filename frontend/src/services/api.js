import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Add interceptor for auth token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchMarketSummary = async () => {
  try {
    const { data } = await API.get('/stats/market-summary');
    return data;
  } catch (error) {
    console.error("Error fetching market summary:", error);
    return null;
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

export const fetchCoinById = async (id) => {
  try {
    const { data } = await API.get(`/coins/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching coin by id:", error);
    return null;
  }
};

export const fetchCoinHistory = async (id, days = 365) => {
  try {
    // Backend route: GET /coins/history/:coinId → returns { data: [...all records sorted asc] }
    const { data } = await API.get(`/coins/history/${id}`);
    if (data && data.data) {
      // Optionally slice to the requested number of days
      const all = data.data;
      const sliced = days && days < all.length ? all.slice(-days) : all;
      return { data: sliced };
    }
    return data;
  } catch (error) {
    console.error('Error fetching coin history:', error);
    return null;
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
