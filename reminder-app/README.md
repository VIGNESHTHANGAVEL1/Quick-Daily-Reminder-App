# Daily Reminder App - Full Stack

A complete daily reminder application with **Node.js/Express backend**, **React web frontend**, and **React Native mobile app** (Android & iOS).

## 📋 Table of Contents

- [Using as a Template](#-using-as-a-template)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)

## 📦 Using as a Template

This project is designed to be **reusable as a template** for new full-stack projects.

### Quick Start

1. **Copy the project:**
   ```bash
   cp -r reminder-app my-new-project
   cd my-new-project
   ```

2. **Run the setup script:**
   ```bash
   # macOS/Linux
   ./setup-template.sh
   
   # Windows
   setup-template.bat
   ```

3. **Follow the prompts** to customize your project

4. **Install dependencies** and start coding!

### Documentation

- **[TEMPLATE_QUICK_START.md](TEMPLATE_QUICK_START.md)** - Quick 3-step guide
- **[TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)** - Complete template documentation
- **[template.config.json](template.config.json)** - Configuration file

The setup script will automatically:
- ✅ Replace project names
- ✅ Update package names
- ✅ Configure ports and database
- ✅ Update mobile app identifiers
- ✅ Customize API routes

See the template guides for detailed instructions and customization options.

## 🔧 Prerequisites

### Required Software

1. **Node.js & npm**
   - Version: Node.js 14+ (recommended: Node.js 20.x)
   - Install from [nodejs.org](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **MongoDB**
   - Version: MongoDB 4.4+ or MongoDB Community Server
   - Install from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Verify installation:
     ```bash
     mongod --version
     ```

3. **Git** (optional, for cloning)
   - Install from [git-scm.com](https://git-scm.com/)

### For Web App Only

- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)

### For Android Development

1. **Java Development Kit (JDK)**
   - Version: JDK 11 or JDK 17
   - Install from [Oracle](https://www.oracle.com/java/technologies/downloads/) or use OpenJDK
   - Verify installation:
     ```bash
     java -version
     javac -version
     ```

2. **Android Studio**
   - Install from [developer.android.com](https://developer.android.com/studio)
   - During installation, ensure:
     - Android SDK is installed
     - Android SDK Platform-Tools are installed
     - Android Virtual Device (AVD) is configured
   - Set environment variables:
     
     **macOS/Linux:**
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     export PATH=$PATH:$ANDROID_HOME/tools
     export PATH=$PATH:$ANDROID_HOME/tools/bin
     ```
     - Add to `~/.bashrc` or `~/.zshrc` for persistence
     
     **Windows:**
     - Open System Properties → Environment Variables
     - Add new System Variable:
       - Variable name: `ANDROID_HOME`
       - Variable value: `C:\Users\<YourUsername>\AppData\Local\Android\Sdk`
     - Edit `Path` variable, add these entries:
       - `%ANDROID_HOME%\emulator`
       - `%ANDROID_HOME%\platform-tools`
       - `%ANDROID_HOME%\tools`
       - `%ANDROID_HOME%\tools\bin`
     - Verify in Command Prompt:
       ```cmd
       echo %ANDROID_HOME%
       adb version
       ```

3. **Android Emulator**
   - Create an AVD through Android Studio
   - Recommended: API Level 30+ (Android 11+)

### For iOS Development

**Note:** iOS development requires macOS. Windows users can develop for Android only, or use a Mac for iOS development.

#### macOS Setup

1. **Xcode**
   - Version: Xcode 14+ (recommended: Latest version)
   - Install from Mac App Store
   - After installation:
     ```bash
     sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
     sudo xcodebuild -license accept
     ```

2. **CocoaPods**
   - Install Ruby (usually pre-installed on macOS)
   - Install CocoaPods:
     ```bash
     sudo gem install cocoapods
     ```
   - Verify installation:
     ```bash
     pod --version
     ```

3. **iOS Simulator**
   - Installed automatically with Xcode
   - Download simulators via Xcode → Settings → Platforms
   - Or via command line:
     ```bash
     xcodebuild -downloadPlatform iOS
     ```

#### Windows Users

- **iOS development is not possible on Windows**
- Use macOS (physical Mac or macOS virtual machine) for iOS development
- Alternative: Use cloud-based Mac services (MacStadium, AWS Mac instances) for iOS builds
- For local development, focus on Android and Web platforms

### React Native CLI (for Mobile)

**macOS/Linux/Windows:**
```bash
npm install -g react-native-cli
```

Or use npx (recommended, no global install needed):
```bash
npx react-native --version
```

## 📦 Installation

### Step 1: Clone or Download the Project

```bash
git clone <repository-url>
cd Quick-Daily-Reminder-App/reminder-app
```

Or download and extract the project folder.

### Step 2: Backend Installation

```bash
cd backend
npm install
```

Create `.env` file in the `backend` directory:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/reminderdb
NODE_ENV=development
```

**Note:** The default port is `5001` (changed from 5000 to avoid conflicts).

### Step 3: Web App Installation

```bash
cd ../web
npm install
```

The web app will automatically use the backend API URL configured in `web/src/api.js`.

### Step 4: Mobile App Installation

```bash
cd ../mobile
npm install --legacy-peer-deps
```

**Note:** Use `--legacy-peer-deps` flag to handle peer dependency conflicts.

#### iOS Additional Setup

```bash
cd ios
pod install
cd ..
```

**Note:** If you encounter boost checksum errors, the boost podspec has been patched to use `archives.boost.io` as the source.

## 🚀 Running the Application

### Prerequisites Check

Before running, ensure:

1. **MongoDB is running:**
   
   **macOS/Linux:**
   ```bash
   mongod
   ```
   Or start as a service:
   ```bash
   # macOS (Homebrew)
   brew services start mongodb-community
   
   # Linux (systemd)
   sudo systemctl start mongod
   ```
   
   **Windows:**
   ```cmd
   # Start MongoDB service
   net start MongoDB
   ```
   Or run directly:
   ```cmd
   "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
   ```
   Or start MongoDB as a Windows service:
   - Open Services (services.msc)
   - Find "MongoDB" service
   - Right-click → Start

2. **Backend is accessible:**
   - Default: `http://localhost:5001`
   - Verify:
     - **macOS/Linux:** `curl http://localhost:5001/api/health`
     - **Windows (PowerShell):** `Invoke-RestMethod -Uri http://localhost:5001/api/health`
     - **Windows (Browser):** Open `http://localhost:5001/api/health` in browser

### Option 1: Run All Platforms Simultaneously

#### Terminal 1: Backend Server

```bash
cd backend
npm start
```

Expected output:
```
Server running on port 5001
MongoDB connected
```

#### Terminal 2: Web App

```bash
cd web
npm run dev
```

Expected output:
```
VITE v4.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173` in your browser.

#### Terminal 3: Metro Bundler (for Mobile)

```bash
cd mobile
npx react-native start
```

Or:
```bash
npm start
```

Expected output:
```
Metro waiting on port 8081
```

#### Terminal 4: Android App

**macOS/Linux:**
```bash
cd mobile
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
npm run android
```

**Windows (Command Prompt or PowerShell):**
```cmd
cd mobile
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\emulator;%ANDROID_HOME%\platform-tools
npm run android
```

**Windows (PowerShell):**
```powershell
cd mobile
$env:ANDROID_HOME="$env:LOCALAPPDATA\Android\Sdk"
$env:PATH="$env:PATH;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\platform-tools"
npm run android
```

**Note:** Ensure Android emulator is running or a physical device is connected.

#### Terminal 5: iOS App (macOS only)

```bash
cd mobile
npm run ios
```

Or specify a simulator:
```bash
npm run ios -- --simulator="iPhone 17 Pro"
```

**Note:** First build may take 5-10 minutes. Subsequent builds are faster.

### Option 2: Run Individual Components

#### Backend Only

```bash
cd backend
npm start
```

Backend API available at: `http://localhost:5001/api`

#### Web App Only

```bash
cd web
npm run dev
```

Web app available at: `http://localhost:5173`

#### Android App Only

1. Start Metro bundler:
   ```bash
   cd mobile
   npm start
   ```

2. In a new terminal, run Android:
   ```bash
   cd mobile
   npm run android
   ```

#### iOS App Only

1. Start Metro bundler:
   ```bash
   cd mobile
   npm start
   ```

2. In a new terminal, run iOS:
   ```bash
   cd mobile
   npm run ios
   ```

### Quick Start Script (All Platforms)

You can also run all services in the background:

**macOS/Linux:**
```bash
# Backend
cd backend && npm start > /tmp/backend.log 2>&1 &

# Web
cd web && npm run dev > /tmp/web.log 2>&1 &

# Metro
cd mobile && npm start > /tmp/metro.log 2>&1 &

# Android
cd mobile && npm run android > /tmp/android.log 2>&1 &

# iOS (macOS only)
cd mobile && npm run ios > /tmp/ios.log 2>&1 &
```

Monitor logs (macOS/Linux):
```bash
tail -f /tmp/backend.log
tail -f /tmp/web.log
tail -f /tmp/metro.log
tail -f /tmp/android.log
tail -f /tmp/ios.log
```

**Windows (PowerShell):**
```powershell
# Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start" -WindowStyle Minimized

# Web
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd web; npm run dev" -WindowStyle Minimized

# Metro
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd mobile; npm start" -WindowStyle Minimized

# Android
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd mobile; npm run android" -WindowStyle Minimized
```

**Windows (Command Prompt):**
```cmd
REM Backend
start "Backend" cmd /k "cd backend && npm start"

REM Web
start "Web" cmd /k "cd web && npm run dev"

REM Metro
start "Metro" cmd /k "cd mobile && npm start"

REM Android
start "Android" cmd /k "cd mobile && npm run android"
```

## 📁 Project Structure

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
│   └── .env          # Configuration (create this)
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
    ├── ios/          # iOS native code
    ├── android/      # Android native code
    ├── App.js        # Main app
    └── package.json
```

## 📝 API Endpoints

### Base URL
- Local: `http://localhost:5001/api`
- Android Emulator: `http://10.0.2.2:5001/api`
- iOS Simulator: `http://localhost:5001/api`

### Reminders
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create new reminder
- `PATCH /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

### Notifications
- `GET /api/notifications` - Get pending notifications

### Health Check
- `GET /api/health` - Check backend status

### Example: Create Reminder

**macOS/Linux:**
```bash
curl -X POST http://localhost:5001/api/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Team Meeting",
    "description": "Discuss Q1 goals",
    "date": "2025-12-15",
    "time": "10:00",
    "repeat": "once"
  }'
```

**Windows (PowerShell):**
```powershell
$body = @{
    title = "Team Meeting"
    description = "Discuss Q1 goals"
    date = "2025-12-15"
    time = "10:00"
    repeat = "once"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5001/api/reminders -Method Post -Body $body -ContentType "application/json"
```

**Windows (Command Prompt - if curl is available):**
```cmd
curl -X POST http://localhost:5001/api/reminders -H "Content-Type: application/json" -d "{\"title\":\"Team Meeting\",\"description\":\"Discuss Q1 goals\",\"date\":\"2025-12-15\",\"time\":\"10:00\",\"repeat\":\"once\"}"
```

## ⚙️ Configuration

### Backend Configuration

Create `backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/reminderdb
NODE_ENV=development
```

### Web App Configuration

The API URL is configured in `web/src/api.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

### Mobile App Configuration

The API URL is automatically configured based on platform in `mobile/src/services/api.js`:
- iOS: `http://localhost:5001/api`
- Android: `http://10.0.2.2:5001/api`

For physical devices, update the API URL to your machine's IP address:
```javascript
const API_URL = 'http://192.168.1.100:5001/api'; // Replace with your IP
```

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

## 🎯 Features

### Backend
- ✓ Full CRUD API for reminders
- ✓ MongoDB persistence
- ✓ Cron-based scheduler (checks every minute)
- ✓ Notification queue system
- ✓ CORS enabled for web/mobile access
- ✓ Health check endpoint

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
- ✓ Local push notifications (Android)
- ✓ Notification polling
- ✓ Platform-specific API URLs

## 🔄 How It Works

1. **Create Reminder**: User adds a reminder with date, time, title
2. **Scheduler Runs**: Backend cron job checks every minute
3. **Match Found**: When current time matches reminder time, it's added to notification queue
4. **Notify User**: Web/mobile polls `/api/notifications` every 10 seconds
5. **Show Notification**: Notification is displayed to user
6. **Mark Complete**: For "once" reminders, status auto-updates to completed

## 🛠 Troubleshooting

### MongoDB Connection Error

**Problem:** `MongooseError: connect ECONNREFUSED`

**Solution:**
1. Ensure MongoDB is running:
   ```bash
   mongod
   ```
2. Check MongoDB service:
   
   **macOS:**
   ```bash
   brew services list
   ```
   
   **Linux:**
   ```bash
   sudo systemctl status mongod
   ```
   
   **Windows:**
   ```cmd
   # Check if MongoDB service is running
   sc query MongoDB
   
   # Or check in Services
   services.msc
   # Look for "MongoDB" service
   ```
   
3. Verify connection string in `backend/.env`

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use`

**Solution:**
1. Find process using the port:
   
   **macOS/Linux:**
   ```bash
   lsof -ti:5001  # Backend
   lsof -ti:5173  # Web
   lsof -ti:8081  # Metro
   ```
   
   **Windows:**
   ```cmd
   netstat -ano | findstr :5001  # Backend
   netstat -ano | findstr :5173  # Web
   netstat -ano | findstr :8081  # Metro
   ```
   Note the PID (Process ID) from the last column.

2. Kill the process:
   
   **macOS/Linux:**
   ```bash
   kill -9 <PID>
   ```
   
   **Windows:**
   ```cmd
   taskkill /PID <PID> /F
   ```
   Or use Task Manager:
   - Open Task Manager (Ctrl+Shift+Esc)
   - Go to Details tab
   - Find process by PID and End Task

3. Or change port in `.env` (backend) or `vite.config.js` (web)

### CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Backend has CORS enabled by default
- Ensure backend is running
- Check API URL matches backend port

### Android Build Errors

**Problem:** Gradle build fails

**Solutions:**
1. **SSL Certificate Error:**
   
   **macOS/Linux:**
   ```bash
   # Import certificate (if needed)
   sudo keytool -import -alias maven -file <certificate> \
     -keystore $JAVA_HOME/lib/security/cacerts \
     -storepass changeit
   ```
   
   **Windows:**
   ```cmd
   REM Import certificate (if needed)
   keytool -import -alias maven -file <certificate> ^
     -keystore "%JAVA_HOME%\lib\security\cacerts" ^
     -storepass changeit
   ```
   Note: Run Command Prompt as Administrator

2. **Gradle Version Mismatch:**
   - Check `android/gradle/wrapper/gradle-wrapper.properties`
   - React Native 0.71.3 requires Gradle 7.5.1

3. **Clean Build:**
   
   **macOS/Linux:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```
   
   **Windows:**
   ```cmd
   cd android
   gradlew.bat clean
   cd ..
   npm run android
   ```

### iOS Build Errors

**Problem:** CocoaPods or Xcode build fails

**Solutions:**
1. **Boost Checksum Error:**
   - Already fixed in the project (uses `archives.boost.io`)
   - If persists, clear cache:
     ```bash
     pod cache clean boost --all
     pod install
     ```

2. **Missing Simulator:**
   ```bash
   xcodebuild -downloadPlatform iOS
   ```

3. **Pod Install Fails:**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

4. **Xcode Command Line Tools:**
   ```bash
   sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
   sudo xcodebuild -license accept
   ```

### Metro Bundler Issues

**Problem:** Metro bundler won't start or shows errors

**Solutions:**
1. Clear cache:
   ```bash
   npm start -- --reset-cache
   ```

2. Clear watchman (if installed):
   ```bash
   watchman watch-del-all
   ```

3. Clear node modules:
   
   **macOS/Linux:**
   ```bash
   rm -rf node_modules
   npm install --legacy-peer-deps
   ```
   
   **Windows:**
   ```cmd
   rmdir /s /q node_modules
   npm install --legacy-peer-deps
   ```
   
   **Windows (PowerShell):**
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install --legacy-peer-deps
   ```

### Module Not Found Errors

**Problem:** `Unable to resolve module`

**Solutions:**
1. Clear Metro cache:
   ```bash
   npm start -- --reset-cache
   ```

2. Reinstall dependencies:
   
   **macOS/Linux:**
   ```bash
   rm -rf node_modules
   npm install --legacy-peer-deps
   ```
   
   **Windows:**
   ```cmd
   rmdir /s /q node_modules
   npm install --legacy-peer-deps
   ```
   
   **Windows (PowerShell):**
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install --legacy-peer-deps
   ```

3. For iOS, reinstall pods:
   ```bash
   cd ios
   pod install
   ```

### Push Notification Errors (iOS)

**Problem:** `NativeEventEmitter requires a non-null argument`

**Solution:**
- Push notifications are disabled for iOS in the current implementation
- Only Android uses push notifications
- This is intentional to avoid iOS native module issues

### App Shows Blank Screen

**Solutions:**
1. Check Metro bundler is running
2. Reload app:
   - **iOS Simulator:** Press `⌘R` (macOS) or `Ctrl+R` (Windows with simulator)
   - **Android Emulator:** Press `R+R` (double tap R) or shake device → Reload
   - **Web:** Press `F5` or `Ctrl+R` (Windows) / `⌘R` (macOS)
3. Check browser console (web) or Metro logs (mobile)
4. Verify backend is running and accessible

## 📱 Platform-Specific Notes

### Android

- **API URL:** Use `10.0.2.2` instead of `localhost` (Android emulator special IP)
- **Permissions:** Ensure `POST_NOTIFICATIONS` and `VIBRATE` permissions are in `AndroidManifest.xml`
- **Gradle:** Uses Gradle 7.5.1 (compatible with React Native 0.71.3)

### iOS

- **API URL:** Use `localhost` (iOS simulator shares host network)
- **Xcode:** Requires full Xcode installation (not just command line tools)
- **Simulator:** First launch may take longer to download simulator runtime
- **CocoaPods:** Required for iOS dependencies

### Web

- **Port:** Default Vite port is 5173
- **Hot Reload:** Enabled by default
- **Browser:** Works in all modern browsers

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
| Mobile | Push notifications (Android) | ✓ |
| Mobile | iOS compatibility | ✓ |
| Integration | .env configuration | ✓ |
| Integration | Platform-specific API URLs | ✓ |

## 🧪 Testing

### Test Backend API

**macOS/Linux:**
```bash
# Health check
curl http://localhost:5001/api/health

# Get all reminders
curl http://localhost:5001/api/reminders

# Create reminder
curl -X POST http://localhost:5001/api/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Reminder",
    "date": "2025-12-15",
    "time": "10:00",
    "repeat": "once"
  }'

# Get notifications
curl http://localhost:5001/api/notifications
```

**Windows (PowerShell):**
```powershell
# Health check
Invoke-RestMethod -Uri http://localhost:5001/api/health

# Get all reminders
Invoke-RestMethod -Uri http://localhost:5001/api/reminders

# Create reminder
$body = @{
    title = "Test Reminder"
    date = "2025-12-15"
    time = "10:00"
    repeat = "once"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5001/api/reminders -Method Post -Body $body -ContentType "application/json"

# Get notifications
Invoke-RestMethod -Uri http://localhost:5001/api/notifications
```

**Windows (Command Prompt with curl):**
```cmd
REM If curl is installed (Windows 10+)
curl http://localhost:5001/api/health

REM Or use PowerShell commands above
```

### Test Web App

1. Open `http://localhost:5173`
2. Create a reminder
3. Verify it appears in the list
4. Edit and delete reminders

### Test Mobile Apps

1. Ensure Metro bundler is running
2. Launch Android/iOS app
3. Create reminders
4. Verify notifications appear (Android)
5. Test all CRUD operations

## 📄 License

MIT

## 🤝 Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review individual component logs
3. Check GitHub issues (if applicable)
4. Verify all prerequisites are installed correctly

## 📝 Notes

- **Port Configuration:** Backend uses port 5001 by default (changed from 5000)
- **Node Version:** Recommended Node.js 20.x (tested with 20.19.4)
- **React Native:** Version 0.71.3
- **MongoDB:** Ensure MongoDB is running before starting backend
- **First Build:** iOS and Android first builds may take 5-10 minutes
- **Metro Bundler:** Must be running for mobile apps to work
- **Platform Support:**
  - **Web:** Works on macOS, Windows, and Linux
  - **Android:** Works on macOS, Windows, and Linux
  - **iOS:** macOS only (requires Xcode)

## 🪟 Windows-Specific Notes

### Command Differences

| Task | macOS/Linux | Windows |
|------|-------------|---------|
| Environment Variables | `export VAR=value` | `set VAR=value` (CMD) or `$env:VAR="value"` (PowerShell) |
| Path Separator | `/` | `\` |
| Kill Process | `kill -9 <PID>` | `taskkill /PID <PID> /F` |
| Find Port Process | `lsof -ti:PORT` | `netstat -ano \| findstr :PORT` |
| Remove Directory | `rm -rf dir` | `rmdir /s /q dir` (CMD) or `Remove-Item -Recurse -Force dir` (PowerShell) |
| Background Process | `command &` | `start "Title" cmd /k "command"` (CMD) or `Start-Process` (PowerShell) |
| Check Service | `brew services list` | `sc query ServiceName` or `services.msc` |

### Windows Terminal Options

- **Command Prompt (cmd.exe):** Traditional Windows terminal
- **PowerShell:** More powerful, recommended for development
- **Windows Terminal:** Modern terminal with tabs (recommended)
- **Git Bash:** Unix-like commands on Windows (if Git for Windows is installed)

### Android SDK Path on Windows

Default location: `C:\Users\<YourUsername>\AppData\Local\Android\Sdk`

Set environment variable:
```cmd
set ANDROID_HOME=C:\Users\<YourUsername>\AppData\Local\Android\Sdk
```
