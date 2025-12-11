import React, { useState } from 'react';
import './ReminderForm.css';

export default function ReminderForm({ onSubmit, initialData = null, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [time, setTime] = useState(initialData?.time || '');
  const [repeat, setRepeat] = useState(initialData?.repeat || 'once');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !date || !time) {
      setError('Title, date, and time are required');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        date,
        time,
        repeat,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save reminder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{initialData ? 'Edit Reminder' : 'Create New Reminder'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter reminder title"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter reminder description"
            disabled={loading}
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Time *</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Repeat</label>
          <select value={repeat} onChange={(e) => setRepeat(e.target.value)} disabled={loading}>
            <option value="once">Once</option>
            <option value="daily">Daily</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : initialData ? 'Update' : 'Create'}
          </button>
          {onCancel && (
            <button type="button" className="btn-secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
