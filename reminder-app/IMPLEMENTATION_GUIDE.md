# Daily Reminder App - Full Implementation Guide

## 1. Project Overview

A complete full-stack reminder application with:
- **Backend**: Node.js + Express + MongoDB
- **Web Frontend**: React.js with Vite
- **Mobile Frontend**: React Native
- **Local Notifications**: Cron-based scheduler with polling

All components run locally and communicate via REST API.

---

## 2. Architecture Overview

```
┌─────────────┐          ┌──────────────┐          ┌──────────────┐
│   Web App   │          │ Mobile App   │          │    Backend   │
│  (React)    │──────────┤ (React Nav)  │◄────────►│ (Node+Expr)  │
│ :5173       │          │  :8081       │          │    :5000     │
└─────────────┘          └──────────────┘          └──────────────┘
       ▲                         ▲                          ▲
       │                         │                          │
       └─────────────────┬───────┴──────────────────────────┘
                         │
                    REST API Calls
                  (Axios HTTP Client)
```

### Data Flow

1. **Create Reminder**: User → Web/Mobile → POST /api/reminders → MongoDB
2. **List Reminders**: Web/Mobile → GET /api/reminders → Database
3. **Scheduler Check**: Every minute, cron job checks for matching reminders
4. **Trigger Notification**: Matching reminder added to notification queue
5. **Fetch Notifications**: Web/Mobile polls GET /api/notifications every 10s
6. **Show Toast**: Notification displayed to user, queue cleared

---

## 3. Backend Implementation

### 3.1 Project Setup

```bash
cd backend
npm install
```

### 3.2 MongoDB Schema (Reminder Model)

```javascript
// src/models/Reminder.js
{
  title: String,           // Required
  description: String,     // Optional, default: ""
  date: String,           // YYYY-MM-DD format
  time: String,           // HH:MM format
  repeat: String,         // "once" | "daily"
  status: String,         // "active" | "completed" | "archived"
  created_at: Date,       // Auto-set on creation
  updated_at: Date        // Auto-updated on modification
}
```

### 3.3 API Endpoints

#### Create Reminder
```
POST /api/reminders
Content-Type: application/json

{
  "title": "Team Meeting",
  "description": "Discuss Q1 goals",
  "date": "2025-12-15",
  "time": "10:00",
  "repeat": "once"
}
```

Response:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Team Meeting",
  "description": "Discuss Q1 goals",
  "date": "2025-12-15",
  "time": "10:00",
  "repeat": "once",
  "status": "active",
  "created_at": "2025-12-11T10:30:00Z",
  "updated_at": "2025-12-11T10:30:00Z"
}
```

#### Get All Reminders
```
GET /api/reminders
```

Response:
```json
[
  { /* reminder 1 */ },
  { /* reminder 2 */ }
]
```

#### Update Reminder
```
PATCH /api/reminders/:id
Content-Type: application/json

{
  "status": "completed"
}
```

#### Delete Reminder
```
DELETE /api/reminders/:id
```

#### Get Notifications
```
GET /api/notifications
```

Response:
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "title": "Team Meeting",
    "description": "Discuss Q1 goals",
    "time": "2025-12-15T10:00:00Z",
    "type": "reminder"
  }
]
```

### 3.4 Scheduler Implementation

**File**: `src/cron/checkReminders.js`

Runs every minute and:
1. Gets current date (YYYY-MM-DD) and time (HH:MM)
2. Queries all active reminders from MongoDB
3. Compares reminder date/time with current time
4. If match found:
   - Adds to notification queue
   - If repeat="once", marks status as "completed"
   - Logs notification triggered

```javascript
// Runs every minute
cron.schedule('* * * * *', async () => {
  // Check logic here
});
```

### 3.5 Running Backend

```bash
npm start          # Production
npm run dev        # Development with auto-reload
```

Server listens on `http://localhost:5000`

---

## 4. Web Frontend (React)

### 4.1 Project Setup

```bash
cd web
npm install
npm run dev
```

Development server: `http://localhost:5173`

### 4.2 Project Structure

```
src/
├── App.jsx           # Main component with polling
├── api.js            # Axios client for API calls
├── pages/
│   ├── ReminderList.jsx      # List and manage reminders
│   ├── ReminderList.css
│   ├── ReminderForm.jsx      # Create/edit form
│   └── ReminderForm.css
├── components/
│   ├── NotificationToast.jsx # Toast notifications
│   └── NotificationToast.css
└── index.html        # HTML entry point
```

### 4.3 Key Features

#### ReminderList Component
- Fetches all reminders on mount
- Displays as grid of cards
- Each card shows: title, description, date, time, repeat type
- Actions: Edit, Delete, Mark Complete
- Auto-refreshes every 5 seconds

#### ReminderForm Component
- Form validation (title, date, time required)
- Submit creates or updates reminder
- Cancel button to go back

#### NotificationToast Component
- Displays notifications from polling
- Auto-dismisses after 5 seconds
- Shows title and description
- Slide-in animation

#### Polling System (App.jsx)
```javascript
// Polls for notifications every 10 seconds
useEffect(() => {
  const interval = setInterval(async () => {
    const response = await getNotifications();
    if (response.data.length > 0) {
      setNotifications(response.data);
    }
  }, 10000);
  return () => clearInterval(interval);
}, []);
```

### 4.4 API Calls (api.js)

```javascript
// Get all reminders
const reminders = await getReminders();

// Create reminder
const created = await createReminder({
  title, description, date, time, repeat
});

// Update reminder
const updated = await updateReminder(id, { status: 'completed' });

// Delete reminder
await deleteReminder(id);

// Get notifications
const notifs = await getNotifications();
```

### 4.5 Building for Production

```bash
npm run build     # Creates dist/ folder
npm run preview   # Preview production build
```

---

## 5. Mobile Frontend (React Native)

### 5.1 Project Setup

```bash
cd mobile
npm install

# For Android
npm run android

# For iOS
npm run ios
```

### 5.2 Project Structure

```
src/
├── screens/
│   ├── HomeScreen.js        # List reminders with FAB
│   └── AddScreen.js         # Create/edit form
├── services/
│   └── api.js              # Axios client
└── App.js                  # Navigation setup
```

### 5.3 Navigation

Uses React Navigation with bottom tab navigator:
- **Reminders Tab**: HomeScreen (list)
- **Add Reminder Tab**: AddScreen (form)

### 5.4 HomeScreen Features

- FlatList of reminders
- Long press checkbox to toggle complete/active
- Edit button → navigate to AddScreen with reminder data
- Delete button → confirm dialog
- FAB (Floating Action Button) to add new reminder

### 5.5 AddScreen Features

- Form for creating/editing reminders
- Date input format: YYYY-MM-DD
- Time input format: HH:MM
- Picker for repeat selection
- Submit/Cancel buttons

### 5.6 Notifications

**Push Notification Setup**:
```javascript
// In App.js
PushNotification.configure({
  onNotification(notification) {
    // Handle tap
  },
});
```

**Polling System**:
```javascript
// Every 10 seconds, checks for notifications
// Shows local push notification when found
```

### 5.7 API Client Configuration

**Android Emulator**: Uses `10.0.2.2:5000` (special Android localhost)
**Physical Device**: Use your machine's IP address

```javascript
const API_URL = 'http://10.0.2.2:5000/api'; // Emulator
const API_URL = 'http://192.168.1.100:5000/api'; // Physical device
```

---

## 6. Integration & Testing

### 6.1 Environment Setup

**Backend (.env)**:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/reminderdb
NODE_ENV=development
```

### 6.2 Testing Workflow

1. **Start MongoDB**:
   ```bash
   mongod
   ```

2. **Start Backend**:
   ```bash
   cd backend && npm start
   ```

3. **Start Web App**:
   ```bash
   cd web && npm run dev
   ```

4. **Start Mobile App**:
   ```bash
   cd mobile && npm run android
   # OR
   npm run ios
   ```

### 6.3 Test Cases

| Test | Steps | Expected |
|------|-------|----------|
| Create Reminder | Fill form → Click Create | Reminder appears in list |
| Edit Reminder | Click Edit → Modify → Update | Changes saved |
| Mark Complete | Click checkbox | Reminder gets strikethrough styling |
| Delete Reminder | Click Delete → Confirm | Reminder removed from list |
| Notifications | Create reminder for current time | Toast appears after trigger |
| Daily Reminder | Create with repeat="daily" | Stays active after trigger |

### 6.4 Postman Testing

**Create Reminder**:
```
POST http://localhost:5000/api/reminders
{
  "title": "Test",
  "date": "2025-12-11",
  "time": "14:30",
  "repeat": "once"
}
```

**Get All**:
```
GET http://localhost:5000/api/reminders
```

**Get Notifications**:
```
GET http://localhost:5000/api/notifications
```

---

## 7. Development Tasks Checklist

### A. Setup Tasks
- [x] Create folder structure (/backend, /web, /mobile)
- [x] Initialize Git repo
- [x] Setup MongoDB locally
- [x] Configure environment variables

### B. Backend Tasks
- [x] Initialize Node.js project
- [x] Create Reminder model (title, date, time, repeat, status)
- [x] Create CRUD endpoints
- [x] Implement cron scheduler
- [x] Create notifications API
- [x] Test in Postman

### C. Web Tasks
- [x] Create Vite + React project
- [x] Build UI layout (header, main area)
- [x] Create reminder list page
- [x] Create reminder form
- [x] Implement edit/delete
- [x] Setup notification polling

### D. Mobile Tasks
- [x] Initialize React Native project
- [x] Create home screen
- [x] Create add reminder screen
- [x] Implement edit/delete
- [x] Setup push notifications
- [x] Test on device/emulator

### E. Integration
- [x] Add .env configuration
- [x] Full system testing
- [x] Bug fixes
- [x] Build for production

---

## 8. Performance & Optimization

### 8.1 Database Indexes

Add to MongoDB for production:
```javascript
db.reminders.createIndex({ date: 1, time: 1 });
db.reminders.createIndex({ status: 1 });
```

### 8.2 Notification Polling

**Web**: Every 10 seconds (configurable)
**Mobile**: Every 10 seconds (configurable)

For production, consider WebSockets for real-time updates.

### 8.3 Memory Management

- Clear notification queue after fetch
- Limit historical data retention
- Implement pagination for large reminder lists

---

## 9. Deployment

### Backend (Node.js)

**Local Server**:
```bash
npm start
```

**With PM2** (production):
```bash
npm install -g pm2
pm2 start server.js --name "reminder-backend"
```

**Docker** (optional):
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Web (React)

**Build**:
```bash
npm run build
```

**Serve with static server**:
```bash
npm install -g serve
serve -s dist
```

### Mobile

**Android**:
```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

**iOS**:
```bash
cd ios
xcodebuild -scheme ReminderApp -configuration Release
```

---

## 10. Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure `mongod` running on port 27017 |
| CORS errors | Check backend CORS configuration |
| 10.0.2.2 not working (Android) | Use machine IP for physical device |
| Port 5000 in use | Change PORT in .env |
| Notification not appearing | Check polling interval and notification queue |
| Build errors | Delete node_modules, run npm install |

---

## 11. Future Enhancements

- [ ] User authentication & multi-user support
- [ ] WebSocket for real-time updates
- [ ] Reminder categories/tags
- [ ] Sound/vibration customization
- [ ] Recurring reminder patterns (weekly, monthly)
- [ ] Reminder notes/attachments
- [ ] Dark mode
- [ ] Timezone support
- [ ] Backup & sync to cloud

---

## 12. File Summary

### Backend Files
- `server.js` - Main Express server
- `src/db.js` - MongoDB connection
- `src/models/Reminder.js` - Data schema
- `src/routes/reminders.js` - CRUD endpoints
- `src/routes/notifications.js` - Notification queue
- `src/cron/checkReminders.js` - Scheduler

### Web Files
- `src/App.jsx` - Main app component
- `src/api.js` - API client
- `src/pages/ReminderList.jsx` - List view
- `src/pages/ReminderForm.jsx` - Form view
- `src/components/NotificationToast.jsx` - Toast component

### Mobile Files
- `App.js` - Navigation & polling
- `src/screens/HomeScreen.js` - List screen
- `src/screens/AddScreen.js` - Form screen
- `src/services/api.js` - API client

---

**Build Date**: December 11, 2025
**Status**: Production Ready ✓
