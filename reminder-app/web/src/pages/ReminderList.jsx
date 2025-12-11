import React, { useState, useEffect } from 'react';
import { getReminders, deleteReminder, updateReminder } from '../api';
import ReminderForm from './ReminderForm';
import './ReminderList.css';

export default function ReminderList() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReminders();
    // Set up polling for changes
    const interval = setInterval(fetchReminders, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await getReminders();
      setReminders(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load reminders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteReminder(id);
        setReminders(reminders.filter((r) => r._id !== id));
      } catch (err) {
        setError('Failed to delete reminder');
      }
    }
  };

  const handleStatusChange = async (reminder) => {
    try {
      const newStatus = reminder.status === 'active' ? 'completed' : 'active';
      const updated = await updateReminder(reminder._id, { status: newStatus });
      setReminders(reminders.map((r) => (r._id === reminder._id ? updated.data : r)));
    } catch (err) {
      setError('Failed to update reminder');
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      const updated = await updateReminder(editingId, data);
      setReminders(reminders.map((r) => (r._id === editingId ? updated.data : r)));
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      throw err;
    }
  };

  const editingReminder = reminders.find((r) => r._id === editingId);

  if (editingId) {
    return (
      <div className="reminder-list-container">
        <ReminderForm
          initialData={editingReminder}
          onSubmit={handleEditSubmit}
          onCancel={() => {
            setEditingId(null);
            setShowForm(false);
          }}
        />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="reminder-list-container">
        <ReminderForm
          onSubmit={async (data) => {
            const { createReminder } = await import('../api');
            await createReminder(data);
            setShowForm(false);
            fetchReminders();
          }}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="reminder-list-container">
      <div className="list-header">
        <h1>📝 My Reminders</h1>
        <button className="btn-create" onClick={() => setShowForm(true)}>
          + New Reminder
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading reminders...</div>
      ) : reminders.length === 0 ? (
        <div className="empty-state">
          <p>No reminders yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="reminders-grid">
          {reminders.map((reminder) => (
            <div key={reminder._id} className={`reminder-card ${reminder.status}`}>
              <div className="card-header">
                <input
                  type="checkbox"
                  checked={reminder.status === 'completed'}
                  onChange={() => handleStatusChange(reminder)}
                  className="reminder-checkbox"
                />
                <h3 className={reminder.status === 'completed' ? 'completed' : ''}>
                  {reminder.title}
                </h3>
              </div>

              {reminder.description && (
                <p className="description">{reminder.description}</p>
              )}

              <div className="reminder-meta">
                <span className="date">📅 {reminder.date}</span>
                <span className="time">🕐 {reminder.time}</span>
                <span className={`repeat ${reminder.repeat}`}>
                  {reminder.repeat === 'once' ? '🔔 Once' : '🔄 Daily'}
                </span>
              </div>

              <div className="card-actions">
                <button
                  className="btn-edit"
                  onClick={() => setEditingId(reminder._id)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(reminder._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
