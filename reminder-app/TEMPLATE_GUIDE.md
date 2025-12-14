# 📦 Full-Stack Project Template Guide

This project is designed as a **generic, reusable template** for creating new full-stack applications with:
- **Backend**: Node.js + Express + MongoDB
- **Web Frontend**: React + Vite
- **Mobile App**: React Native (Android & iOS)

## 🎯 Purpose

Use this template to quickly bootstrap new projects without starting from scratch. All project-specific names, configurations, and identifiers can be easily customized.

## 🚀 Quick Start: Using This Template

### Step 1: Copy the Template

```bash
# Option 1: Clone and rename
git clone <template-repo-url> my-new-project
cd my-new-project

# Option 2: Copy the directory
cp -r reminder-app my-new-project
cd my-new-project
```

### Step 2: Run the Setup Script

**macOS/Linux:**
```bash
chmod +x setup-template.sh
./setup-template.sh
```

**Windows:**
```cmd
setup-template.bat
```

The script will prompt you for:
- Project name
- Display name
- Author information
- Backend port
- Database name
- Mobile app package name
- App name
- Model name
- Route prefix

### Step 3: Manual Customization

After running the setup script, you may need to manually update:

#### Android Package Names

1. **Update Java package directories:**
   ```bash
   # Rename the package directory
   cd mobile/android/app/src/main/java
   mv com/reminderapp com/yourpackage
   ```

2. **Update package declarations in Java files:**
   - `MainActivity.java`
   - `MainApplication.java`
   - `ReactNativeFlipper.java` (debug and release)

3. **Update build.gradle:**
   - `applicationId` in `mobile/android/app/build.gradle`

#### iOS Bundle ID

1. Open `mobile/ios/YourApp.xcworkspace` in Xcode
2. Select the project in the navigator
3. Go to "Signing & Capabilities"
4. Update the Bundle Identifier

#### iOS Project Name

1. In Xcode, select the project
2. Rename the target
3. Update folder names if needed

### Step 4: Install Dependencies

```bash
# Backend
cd backend
npm install

# Web
cd ../web
npm install

# Mobile
cd ../mobile
npm install --legacy-peer-deps

# iOS (macOS only)
cd ios
pod install
cd ..
```

### Step 5: Configure Environment

1. **Backend:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your settings
   ```

2. **Update API URLs:**
   - Web: `web/src/api.js`
   - Mobile: `mobile/src/services/api.js`

### Step 6: Customize Your Models

1. **Backend Model:**
   - Update `backend/src/models/Reminder.js` (rename file and model)
   - Modify the schema to match your data structure

2. **Update Routes:**
   - Rename `backend/src/routes/reminders.js`
   - Update route paths and model references

3. **Update Frontend:**
   - Rename components in `web/src/pages/`
   - Update mobile screens in `mobile/src/screens/`
   - Update API calls to match your new model

## 📋 Template Configuration

The `template.config.json` file contains all customizable values:

```json
{
  "project": {
    "name": "{{PROJECT_NAME}}",
    "displayName": "{{PROJECT_DISPLAY_NAME}}",
    "description": "{{PROJECT_DESCRIPTION}}"
  },
  "backend": {
    "port": "{{BACKEND_PORT}}",
    "databaseName": "{{DATABASE_NAME}}"
  },
  "mobile": {
    "packageName": "com.{{PACKAGE_NAME}}",
    "appName": "{{APP_NAME}}"
  },
  "api": {
    "modelName": "{{MODEL_NAME}}",
    "routePrefix": "{{ROUTE_PREFIX}}"
  }
}
```

## 🔧 What Gets Replaced

The setup script automatically replaces:

### Project-Level
- ✅ Project name in package.json files
- ✅ Display names in HTML and config files
- ✅ Author information
- ✅ README.md references

### Backend
- ✅ Package name
- ✅ Port number
- ✅ Database name
- ✅ Model names (in code)
- ✅ Route prefixes

### Web
- ✅ Package name
- ✅ HTML title
- ✅ API endpoints

### Mobile
- ✅ Package name
- ✅ App name
- ✅ Display name
- ✅ Component registration
- ✅ Android package names
- ✅ iOS bundle IDs (partially)

## 📝 Customization Checklist

After running the setup script, verify:

- [ ] `template.config.json` has correct values
- [ ] `backend/package.json` has correct name
- [ ] `web/package.json` has correct name
- [ ] `mobile/package.json` has correct name
- [ ] `mobile/index.js` has correct component name
- [ ] Android `build.gradle` has correct package name
- [ ] Android Java files have correct package declarations
- [ ] Android `strings.xml` has correct app name
- [ ] iOS bundle ID is updated in Xcode
- [ ] Backend `.env` file is configured
- [ ] Model files are renamed and customized
- [ ] Route files are renamed and customized
- [ ] Frontend components are renamed and customized
- [ ] API endpoints match your new model

## 🎨 Customizing the Data Model

### 1. Update the Backend Model

Edit `backend/src/models/Reminder.js`:

```javascript
const mongoose = require('mongoose');

const YourModelSchema = new mongoose.Schema({
  // Your fields here
  title: { type: String, required: true },
  // ... other fields
}, {
  timestamps: true
});

module.exports = mongoose.model('YourModel', YourModelSchema);
```

### 2. Update Routes

Edit `backend/src/routes/reminders.js`:

```javascript
const express = require('express');
const router = express.Router();
const YourModel = require('../models/YourModel');

// Update all references
router.get('/', async (req, res) => {
  const items = await YourModel.find();
  res.json(items);
});
// ... etc
```

### 3. Update Frontend Components

- Rename `ReminderList.jsx` → `YourModelList.jsx`
- Rename `ReminderForm.jsx` → `YourModelForm.jsx`
- Update all references to the model name

### 4. Update Mobile Screens

- Rename `HomeScreen.js` if needed
- Update API calls to match new endpoints
- Update state management for your model

## 🔄 Reusing for Multiple Projects

1. **Keep the original template clean:**
   - Don't modify the template directly
   - Always copy it for new projects

2. **Version control:**
   - Commit the template to a separate repository
   - Tag stable versions
   - Document changes between versions

3. **Document your customizations:**
   - Keep notes on what you changed
   - Update this guide with project-specific patterns

## 📚 Project Structure

```
your-project/
├── template.config.json      # Template configuration
├── setup-template.sh         # Setup script (macOS/Linux)
├── setup-template.bat         # Setup script (Windows)
├── TEMPLATE_GUIDE.md         # This file
├── README.md                  # Project documentation
├── backend/                   # Node.js backend
│   ├── src/
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   └── cron/             # Scheduled tasks
│   └── server.js
├── web/                      # React web app
│   └── src/
│       ├── pages/            # Page components
│       └── components/       # Reusable components
└── mobile/                   # React Native app
    ├── src/
    │   ├── screens/          # Screen components
    │   └── services/         # API services
    ├── android/              # Android native code
    └── ios/                  # iOS native code
```

## 🛠️ Advanced Customization

### Adding New Features

1. **Backend:**
   - Add new models in `backend/src/models/`
   - Add new routes in `backend/src/routes/`
   - Add new cron jobs in `backend/src/cron/`

2. **Web:**
   - Add new pages in `web/src/pages/`
   - Add new components in `web/src/components/`
   - Update routing in `web/src/App.jsx`

3. **Mobile:**
   - Add new screens in `mobile/src/screens/`
   - Update navigation in `mobile/App.js`
   - Add new services in `mobile/src/services/`

### Changing the Tech Stack

This template uses:
- **Backend**: Express + MongoDB
- **Web**: React + Vite
- **Mobile**: React Native

To change:
1. Update dependencies in `package.json` files
2. Modify configuration files
3. Update setup scripts if needed
4. Document changes in this guide

## 🐛 Troubleshooting

### Setup Script Issues

**Problem:** Script doesn't replace all values
- **Solution:** Manually check `template.config.json` and update files

**Problem:** Android package name not updated
- **Solution:** Manually rename Java package directories and update imports

**Problem:** iOS bundle ID not updated
- **Solution:** Update in Xcode project settings

### Build Issues

**Problem:** Dependencies not installing
- **Solution:** Clear cache and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

**Problem:** Android build fails
- **Solution:** Clean and rebuild:
  ```bash
  cd mobile/android
  ./gradlew clean
  cd ..
  npm run android
  ```

## 📖 Additional Resources

- [Backend README](backend/README.md)
- [Web README](web/README.md)
- [Mobile README](mobile/README.md)
- [Main README](README.md)
- [Development Checklist](DEVELOPMENT_CHECKLIST.md)

## 🤝 Contributing to the Template

If you improve this template:

1. Test the setup script thoroughly
2. Update this guide
3. Document new features
4. Keep backward compatibility when possible
5. Tag new template versions

## 📄 License

This template is provided as-is. Customize it for your projects as needed.

---

**Happy Coding! 🚀**

