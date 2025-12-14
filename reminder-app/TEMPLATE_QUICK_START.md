# 🚀 Template Quick Start Guide

## Using This Project as a Template

This project is a **generic, reusable template** for full-stack applications. Follow these steps to create your new project:

## ⚡ 3-Step Setup

### 1. Copy the Template
```bash
# Clone or copy this directory
cp -r reminder-app my-new-project
cd my-new-project
```

### 2. Run Setup Script
```bash
# macOS/Linux
./setup-template.sh

# Windows
setup-template.bat
```

### 3. Install Dependencies
```bash
# Backend
cd backend && npm install && cd ..

# Web
cd web && npm install && cd ..

# Mobile
cd mobile && npm install --legacy-peer-deps && cd ..

# iOS (macOS only)
cd mobile/ios && pod install && cd ../..
```

## 📝 What You'll Be Asked

The setup script will prompt for:

| Question | Example | Used For |
|----------|---------|----------|
| Project Name | `myapp` | Package names, folder names |
| Display Name | `My Awesome App` | User-facing names |
| Author Name | `John Doe` | Package.json |
| Backend Port | `5001` | Server port |
| Database Name | `myappdb` | MongoDB database |
| Package Name | `myapp` | Android: `com.myapp` |
| App Name | `MyApp` | React Native component |
| Model Name | `Task` | Database model |
| Route Prefix | `tasks` | API routes: `/api/tasks` |

## ✅ Post-Setup Checklist

After running the setup script:

- [ ] Review `template.config.json` - all values correct?
- [ ] Update Android package directories:
  ```bash
  cd mobile/android/app/src/main/java
  mv com/reminderapp com/yourpackage
  ```
- [ ] Update Java package declarations in:
  - `MainActivity.java`
  - `MainApplication.java`
  - `ReactNativeFlipper.java` (debug & release)
- [ ] Update iOS Bundle ID in Xcode
- [ ] Customize your data model:
  - Rename `Reminder.js` model
  - Update schema fields
  - Update routes
- [ ] Update frontend components:
  - Rename `ReminderList.jsx` → `YourModelList.jsx`
  - Update all references
- [ ] Configure `.env` files:
  - `backend/.env`
  - Update API URLs in web and mobile

## 🎯 Common Customizations

### Change the Data Model

1. **Backend Model:**
   ```bash
   mv backend/src/models/Reminder.js backend/src/models/YourModel.js
   # Edit the file and update schema
   ```

2. **Backend Routes:**
   ```bash
   mv backend/src/routes/reminders.js backend/src/routes/yourmodels.js
   # Update route paths and model references
   ```

3. **Frontend:**
   - Rename components
   - Update API calls
   - Update state management

### Change API Endpoints

1. **Backend:** Update routes in `backend/src/routes/`
2. **Web:** Update `web/src/api.js`
3. **Mobile:** Update `mobile/src/services/api.js`

### Add New Features

- **Backend:** Add models, routes, cron jobs
- **Web:** Add pages, components, routes
- **Mobile:** Add screens, services, navigation

## 📚 Full Documentation

- **[TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)** - Complete template documentation
- **[README.md](README.md)** - Project documentation
- **[DEVELOPMENT_CHECKLIST.md](DEVELOPMENT_CHECKLIST.md)** - Setup checklist

## 🆘 Need Help?

1. Check [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) for detailed instructions
2. Review the [README.md](README.md) for project-specific info
3. Check [Troubleshooting](#-troubleshooting) section in TEMPLATE_GUIDE.md

---

**Ready to build? Run the setup script and start coding! 🎉**

