# Daily Reminder App - Full Stack

A complete daily reminder application with **Node.js/Express backend**, **React web frontend**, and **React Native mobile app**.

## 📋 Project Structure

```
reminder-app/
├── backend/           # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/    # Mongoose schemas
│   │   ├── routes/    # API endpoints
│   │   ├── cron/      # Reminder scheduler
│   │   └── db.js      # Database connection
│   ├── server.js      # Main server file
│   ├── package.json
│   └── .env          # Configuration
├── web/              # React.js with Vite
│   ├── src/
│   │   ├── pages/    # ReminderList, ReminderForm
│   │   ├── components/ # NotificationToast
│   │   ├── api.js    # API client
│   │   └── App.jsx   # Main app
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── mobile/           # React Native
    ├── src/
    │   ├── screens/  # HomeScreen, AddScreen
    │   └── services/ # API client
    ├── App.js        # Main app
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- MongoDB running locally on `localhost:27017`
- (Mobile) React Native CLI & Android Studio/Xcode

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`

### 2. Web App Setup

```bash
cd web
npm install
npm run dev
```

App runs on `http://localhost:5173`

### 3. Mobile App Setup

**Android:**
```bash
cd mobile
npm install
npm run android
```

**iOS:**
```bash
npm run ios
```

## 📝 API Endpoints

### Reminders
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create new reminder
- `PATCH /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

### Notifications
- `GET /api/notifications` - Get pending notifications

### Health Check
- `GET /api/health` - Check backend status

## 🔔 Reminder Model

```javascript
{
  title: String,           // Required
  description: String,     // Optional
  date: String,           // YYYY-MM-DD format
  time: String,           // HH:MM format
  repeat: String,         // 'once' | 'daily'
  status: String,         // 'active' | 'completed' | 'archived'
  created_at: Date,
  updated_at: Date
}
```

## ⚙️ Configuration

Create a `.env` file in the backend folder:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/reminderdb
NODE_ENV=development
```

## 🎯 Features

### Backend
- ✓ Full CRUD API for reminders
- ✓ MongoDB persistence
- ✓ Cron-based scheduler (checks every minute)
- ✓ Notification queue system
- ✓ CORS enabled for web/mobile access

### Web Frontend
- ✓ List all reminders with grid layout
- ✓ Create new reminders with form validation
- ✓ Edit existing reminders
- ✓ Mark reminders as completed
- ✓ Delete reminders
- ✓ Real-time notification polling
- ✓ Toast notifications
- ✓ Responsive design

### Mobile App
- ✓ Tab-based navigation (Reminders + Add)
- ✓ View all reminders
- ✓ Create/edit reminders
- ✓ Mark as completed/uncompleted
- ✓ Delete reminders
- ✓ Local push notifications
- ✓ Notification polling

## 🔄 How It Works

1. **Create Reminder**: User adds a reminder with date, time, title
2. **Scheduler Runs**: Backend cron job checks every minute
3. **Match Found**: When current time matches reminder time, it's added to notification queue
4. **Notify User**: Web/mobile polls `/api/notifications` every 10 seconds
5. **Show Toast**: Notification is displayed to user
6. **Mark Complete**: For "once" reminders, status auto-updates to completed

## 📊 Development Task Completion

| Module | Task | Status |
|--------|------|--------|
| Setup | Create folder structure | ✓ |
| Setup | Initialize Git | ✓ |
| Backend | Initialize Node project | ✓ |
| Backend | Create Reminder model | ✓ |
| Backend | CRUD endpoints | ✓ |
| Backend | Cron scheduler | ✓ |
| Backend | Notifications API | ✓ |
| Web | React + Vite setup | ✓ |
| Web | Reminder list page | ✓ |
| Web | Create form | ✓ |
| Web | Edit/Delete | ✓ |
| Web | Notification polling | ✓ |
| Mobile | React Native setup | ✓ |
| Mobile | Home screen | ✓ |
| Mobile | Add screen | ✓ |
| Mobile | Push notifications | ✓ |
| Integration | .env configuration | ✓ |

## 🧪 Testing

### Create a Reminder (Postman/curl)

```bash
curl -X POST http://localhost:5000/api/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Team Meeting",
    "description": "Discuss Q1 goals",
    "date": "2025-12-15",
    "time": "10:00",
    "repeat": "once"
  }'
```

### Get All Reminders

```bash
curl http://localhost:5000/api/reminders
```

### Check Notifications

```bash
curl http://localhost:5000/api/notifications
```

## 🛠 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

**CORS Errors**
- Backend has CORS enabled
- For mobile, use `10.0.2.2` instead of `localhost` on Android emulator

**Port Already in Use**
- Backend: Change `PORT` in `.env`
- Web: Vite will use next available port (usually 5174+)

## 📱 Mobile Testing

**Android Emulator:**
- Use `10.0.2.2:5000` for API calls (special Android emulator localhost)

**Physical Device:**
- Update API URL in `mobile/src/services/api.js` to your machine's IP
- Example: `http://192.168.1.100:5000/api`

## 📄 License

MIT

## 🤝 Support

For issues or questions, check individual README files in each folder.
