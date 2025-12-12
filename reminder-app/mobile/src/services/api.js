import axios from 'axios';
import { Platform } from 'react-native';

// Use localhost for iOS simulator, 10.0.2.2 for Android emulator
const API_URL = Platform.OS === 'ios' 
  ? 'http://localhost:5001/api' 
  : 'http://10.0.2.2:5001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Reminders API
export const getReminders = () => api.get('/reminders');
export const createReminder = (data) => api.post('/reminders', data);
export const updateReminder = (id, data) => api.patch(`/reminders/${id}`, data);
export const deleteReminder = (id) => api.delete(`/reminders/${id}`);

// Notifications API
export const getNotifications = () => api.get('/notifications');

export default api;
