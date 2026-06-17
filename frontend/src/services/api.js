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

export const fetchCoinHistory = async (id, days = 7) => {
  try {
    // The endpoint might be different depending on exact backend setup, 
    // but assuming standard /coins/:id/history based on previous discussions.
    const { data } = await API.get(`/coins/${id}/history?days=${days}`);
    return data;
  } catch (error) {
    console.error("Error fetching coin history:", error);
    return null;
  }
};

export default API;
