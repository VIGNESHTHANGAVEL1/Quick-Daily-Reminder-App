import React, { useState, useEffect } from 'react';
import './NotificationToast.css';

export default function NotificationToast({ notifications }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (notifications.length > 0) {
      const newToasts = notifications.map((notif, idx) => ({
        id: `${Date.now()}-${idx}`,
        ...notif,
      }));

      setToasts((prev) => [...prev, ...newToasts]);

      // Auto-remove toasts after 5 seconds
      newToasts.forEach((toast) => {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, 5000);
      });
    }
  }, [notifications]);

  return (
    <div className="notification-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <div className="toast-icon">🔔</div>
          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            {toast.description && (
              <div className="toast-description">{toast.description}</div>
            )}
          </div>
          <button
            className="toast-close"
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
