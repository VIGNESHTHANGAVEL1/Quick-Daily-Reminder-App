const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const { addNotification } = require('../routes/notifications');

// Run every minute to check for reminders
const startReminderChecker = () => {
  // Check every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
      const currentTime = now.toTimeString().slice(0, 5); // HH:MM

      const reminders = await Reminder.find({ status: 'active' });

      reminders.forEach((reminder) => {
        // Check if reminder matches current date and time
        if (reminder.date === currentDate && reminder.time === currentTime) {
          addNotification(reminder);
          console.log(`📢 Reminder triggered: ${reminder.title}`);

          // If it's a once reminder, mark as completed
          if (reminder.repeat === 'once') {
            reminder.status = 'completed';
            reminder.save();
          }
        }
      });
    } catch (error) {
      console.error('Cron error:', error.message);
    }
  });

  console.log('✓ Reminder checker started (checks every minute)');
};

module.exports = startReminderChecker;
