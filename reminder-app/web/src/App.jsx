import React, { useState, useEffect } from 'react';
import ReminderList from './pages/ReminderList';
import NotificationToast from './components/NotificationToast';
import { getNotifications } from './api';
import './App.css';

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Poll for notifications every 10 seconds
    const pollNotifications = async () => {
      try {
        const response = await getNotifications();
        if (response.data.length > 0) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    // Initial poll
    pollNotifications();

    // Set up interval
    const interval = setInterval(pollNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>⏰ Daily Reminder App</h1>
        <p>Manage your reminders efficiently</p>
      </header>
      <main className="app-main">
        <ReminderList />
      </main>
      <NotificationToast notifications={notifications} />
    </div>
  );
}

export default App;
