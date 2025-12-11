# Reminder App Backend

Node.js + Express + MongoDB backend for the Daily Reminder App.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Ensure MongoDB is running locally on `mongodb://localhost:27017/reminderdb`

3. Start the server:
```bash
npm start
```

Or with auto-reload (requires `npm install -g node-dev`):
```bash
npm run dev
```

## API Endpoints

### Reminders
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create new reminder
- `PATCH /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

### Notifications
- `GET /api/notifications` - Get pending notifications

### Health Check
- `GET /api/health` - Check if server is running

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/reminderdb
NODE_ENV=development
```
