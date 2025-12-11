import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
