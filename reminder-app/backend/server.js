require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db');
const remindersRouter = require('./src/routes/reminders');
const { router: notificationsRouter } = require('./src/routes/notifications');
const startReminderChecker = require('./src/cron/checkReminders');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Start reminder checker cron
startReminderChecker();

// Routes
app.use('/api/reminders', remindersRouter);
app.use('/api/notifications', notificationsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Reminders API: http://localhost:${PORT}/api/reminders`);
  console.log(`🔔 Notifications API: http://localhost:${PORT}/api/notifications\n`);
});
