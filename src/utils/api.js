import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.hiddensafari.com', // Replace with your API base URL
  timeout: 5000, // Optional: Set timeout
});

// Interceptor to add auth token if available
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user')); // Adjust based on your AuthContext
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const getEvents = () => api.get('/events');
export const getTeams = () => api.get('/teams');
// Add more API calls as needed

export default api;