const express = require('express');
const router = express.Router();

let notificationQueue = [];

// Get pending notifications (and clear them)
router.get('/', (req, res) => {
  const notifications = [...notificationQueue];
  notificationQueue = [];
  res.json(notifications);
});

// Add notification to queue (internal use)
const addNotification = (reminder) => {
  notificationQueue.push({
    id: reminder._id,
    title: reminder.title,
    description: reminder.description,
    time: new Date(),
    type: 'reminder',
  });
};

module.exports = {
  router,
  addNotification,
  getNotifications: () => notificationQueue,
  clearNotifications: () => {
    const temp = [...notificationQueue];
    notificationQueue = [];
    return temp;
  },
};
