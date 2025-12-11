1. Project Layout (Mono-Repo Structure)
reminder-app/
├─ .gitignore
├─ README.md
├─ package.json            
├─ .env.example
├─ backend/
│  ├─ package.json
│  ├─ server.js
│  ├─ src/
│  │  ├─ config/
│  │  │  └─ db.js
│  │  ├─ models/
│  │  │  └─ Reminder.js
│  │  ├─ routes/
│  │  │  └─ reminders.js
│  │  ├─ routes/
│  │    └─ notifications.js
│  │  
│  └─ .env
├─ web/
│  ├─ package.json
│  ├─ index.html
│  └─ src/
│     ├─ main.jsx
│     ├─ App.jsx
│     ├─ api/
│     │  └─ client.js
│     ├─ pages/
│     │  ├─ ListReminders.jsx
│     │  └─ AddEditReminder.jsx
│     └─ components/
│        └─ ReminderItem.jsx
└─ mobile/                  #React Native project
   ├─ package.json
   └─ src/
      ├─ App.js
      ├─ screens/
      │  ├─ HomeScreen.js
      │  └─ AddEditScreen.js
      └─ api/
         └─ client.js
		 
2. Backend Setup
Install backend dependencies
cd backend
npm install express mongoose cors dotenv node-cron

Reminder Model Fields
title		  Reminder title
description	  Optional description
date		  Scheduled date
time		  Time in HH:mm
repeat		  once / daily
status		  active / completed
created_at	
updated_at	

3. Backend API Endpoints
A. Reminder CRUD APIs (Mandatory)
Method	Endpoint	        Description
POST	/api/reminders	    Create a new reminder
GET	    /api/reminders	    Fetch all reminders
PATCH	/api/reminders/:id	Update reminder
DELETE	/api/reminders/:id	Delete reminder
B. Notification API
GET	    /api/notifications	Fetch pending notifications created by scheduler

4. Web Application (React.js)
Create project:
npm create vite@latest web --template react
cd web
npm install axios react-router-dom

Web UI Screens (5 Total)
1. Header
App title
Sync/online status
Optional refresh button
2. Reminder List Page
List/Master table
Columns: Title, Date, Time, Repeat, Status
Buttons: Edit, Delete
3. Add Reminder Page
Form fields:
Title
Description
Date
Time
Repeat (once / daily)
Submit → Creates reminder
4. Edit Reminder Page
Same form as Add
Loads existing values
Update reminder
5. Notification Toast Component
Small popup notifications
Auto-hide after few seconds

5. Mobile App (React Native)
Create project:
npx react-native init mobile
cd mobile
npm install axios @react-navigation/native react-native-push-notification

Mobile UI Screens (3 Total)
1. HomeScreen
List all reminders
Buttons → Add / Edit / Delete
Local push notifications triggered by backend scheduler
2. AddEditScreen
Same fields as web
Save or Update
3. App.js
Navigation
Axios client
Poll /api/notifications

6. Testing Steps (Backend/Web/Mobile)
Backend Test (Postman)
Create a reminder for next 2 minutes
Wait for cron scheduler to run
Call GET /api/notifications
Expect new notification entry
Web App Test
Open Create Reminder page
Add new reminder
Check it appears in the list
When scheduler triggers → Toast notification appears
Mobile App Test
Add reminder from mobile
Wait for scheduler
Mobile shows local push notification (via React Native Push Notification)

7. Prerequisites

Node.js 18+
MongoDB 
Git
Postman 
Expo Go app (if testing on Expo)

8. Summary
Module	      Count
Web UI	    5 Screens
Mobile UI	3 Screens
APIs	    5 Endpoints 
Tech	    Node.js, Express, MongoDB, React.js, React Native
