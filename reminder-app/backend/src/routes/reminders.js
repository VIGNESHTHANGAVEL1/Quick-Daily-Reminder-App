const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

// Create a new reminder
router.post('/', async (req, res) => {
  try {
    const { title, description, date, time, repeat, status } = req.body;

    if (!title || !date || !time) {
      return res.status(400).json({ error: 'Title, date, and time are required' });
    }

    const reminder = new Reminder({
      title,
      description: description || '',
      date,
      time,
      repeat: repeat || 'once',
      status: status || 'active',
    });

    const saved = await reminder.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reminders
router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ date: 1, time: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single reminder
router.get('/:id', async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a reminder
router.patch('/:id', async (req, res) => {
  try {
    const { title, description, date, time, repeat, status } = req.body;

    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    if (title !== undefined) reminder.title = title;
    if (description !== undefined) reminder.description = description;
    if (date !== undefined) reminder.date = date;
    if (time !== undefined) reminder.time = time;
    if (repeat !== undefined) reminder.repeat = repeat;
    if (status !== undefined) reminder.status = status;

    const updated = await reminder.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a reminder
router.delete('/:id', async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    res.json({ message: 'Reminder deleted', reminder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
