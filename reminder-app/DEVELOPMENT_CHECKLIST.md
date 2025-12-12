# Development Setup Checklist

## 📋 Pre-Development Prerequisites Checklist

Use this checklist to ensure all required tools, accounts, and configurations are set up **before** starting development on web and mobile applications.

---

## ✅ Phase 1: System Requirements

### Operating System
- [ ] **macOS** (Required for iOS development)
  - Version: macOS 12+ (Monterey or later)
  - Verify: `sw_vers`
  
- [ ] **Windows/Linux** (Android development only)
  - Windows 10/11 or Ubuntu 20.04+
  - Note: iOS development requires macOS

### System Resources
- [ ] **Minimum 16GB RAM** (Recommended: 32GB)
  - Verify: `system_profiler SPHardwareDataType | grep Memory` (macOS)
  
- [ ] **At least 50GB free disk space**
  - Verify: `df -h` (macOS/Linux) or check disk properties (Windows)
  
- [ ] **Stable internet connection** (for downloading dependencies and SDKs)

---

## ✅ Phase 2: Core Development Tools

### Node.js & npm
- [ ] **Node.js installed** (Version 18+ recommended, 20.x preferred)
  - Download: https://nodejs.org/
  - Verify: `node --version` (should show v18.x.x or higher)
  - Verify: `npm --version` (should show 9.x.x or higher)

- [ ] **nvm (Node Version Manager)** - Optional but recommended
  - Install: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
  - Verify: `nvm --version`
  - Set default: `nvm alias default 20.19.4` (or your preferred version)

### Git
- [ ] **Git installed**
  - macOS: `xcode-select --install` or download from https://git-scm.com/
  - Verify: `git --version`
  
- [ ] **Git configured**
  - Set name: `git config --global user.name "Your Name"`
  - Set email: `git config --global user.email "your.email@example.com"`
  - Verify: `git config --global --list`

### Code Editor
- [ ] **VS Code** (Recommended) or your preferred IDE
  - Download: https://code.visualstudio.com/
  - Recommended extensions:
    - [ ] ESLint
    - [ ] Prettier
    - [ ] React/React Native snippets
    - [ ] GitLens

---

## ✅ Phase 3: Backend Development Setup

### MongoDB
- [ ] **MongoDB installed**
  - Download: https://www.mongodb.com/try/download/community
  - macOS: `brew install mongodb-community` (if using Homebrew)
  - Verify: `mongod --version`
  
- [ ] **MongoDB running**
  - Start: `mongod` (or `brew services start mongodb-community` on macOS)
  - Verify: `mongo --eval "db.version()"` or check connection
  - Default port: 27017

### Environment Variables
- [ ] **Backend .env file created**
  - Location: `backend/.env`
  - Required variables:
    ```env
    PORT=5001
    MONGODB_URI=mongodb://localhost:27017/reminderdb
    NODE_ENV=development
    ```

---

## ✅ Phase 4: Web Development Setup

### No additional prerequisites required
- [ ] **Modern web browser** installed
  - Chrome, Firefox, Safari, or Edge (latest version)
  
- [ ] **Browser DevTools** enabled
  - Know how to open Developer Tools (F12 or Cmd+Option+I)

---

## ✅ Phase 5: Android Development Setup

### Java Development Kit (JDK)
- [ ] **JDK 11 or JDK 17 installed**
  - Download: https://www.oracle.com/java/technologies/downloads/ or OpenJDK
  - Verify: `java -version` (should show 11.x.x or 17.x.x)
  - Verify: `javac -version`
  
- [ ] **JAVA_HOME environment variable set**
  - macOS: Add to `~/.zshrc` or `~/.bash_profile`:
    ```bash
    export JAVA_HOME=$(/usr/libexec/java_home -v 17)
    export PATH=$JAVA_HOME/bin:$PATH
    ```
  - Verify: `echo $JAVA_HOME`

### Android Studio
- [ ] **Android Studio installed**
  - Download: https://developer.android.com/studio
  - Version: Latest stable version
  - Verify: Open Android Studio and check version

- [ ] **Android SDK installed**
  - Open Android Studio → SDK Manager
  - Install:
    - [ ] Android SDK Platform-Tools
    - [ ] Android SDK Build-Tools
    - [ ] Android SDK Platform (API Level 30+)
    - [ ] Android Emulator
    - [ ] Google Play services (if needed)

- [ ] **Android SDK environment variables set**
  - macOS/Linux: Add to `~/.zshrc` or `~/.bash_profile`:
    ```bash
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    ```
  - Windows: Set in System Environment Variables
  - Verify: `echo $ANDROID_HOME` (macOS/Linux) or check Environment Variables (Windows)

### Android Virtual Device (AVD)
- [ ] **At least one AVD created**
  - Open Android Studio → AVD Manager
  - Create Virtual Device:
    - [ ] Device: Pixel 5 or similar
    - [ ] System Image: API Level 30+ (Android 11+)
    - [ ] Verify: AVD appears in list and can be started

### Android Build Tools
- [ ] **Gradle wrapper configured** (usually auto-configured)
  - Verify: `cd android && ./gradlew --version` (after project setup)

---

## ✅ Phase 6: iOS Development Setup (macOS only)

### Xcode
- [ ] **Xcode installed** (Latest version from Mac App Store)
  - Download: Mac App Store → Search "Xcode"
  - Size: ~15GB, download may take time
  - Verify: `xcodebuild -version` (should show Xcode 14+)

- [ ] **Xcode Command Line Tools configured**
  - Run: `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`
  - Verify: `xcode-select -p` (should show `/Applications/Xcode.app/Contents/Developer`)

- [ ] **Xcode license accepted**
  - Run: `sudo xcodebuild -license accept`
  - Verify: No license prompts when running Xcode commands

### CocoaPods
- [ ] **Ruby installed** (usually pre-installed on macOS)
  - Verify: `ruby --version`
  
- [ ] **CocoaPods installed**
  - Install: `sudo gem install cocoapods`
  - Verify: `pod --version` (should show 1.11+)
  
- [ ] **CocoaPods repo updated** (first time setup)
  - Run: `pod setup` (may take 10-15 minutes)
  - Verify: `pod repo list`

### iOS Simulator
- [ ] **iOS Simulator runtime downloaded**
  - Open Xcode → Settings → Platforms
  - Download: iOS Simulator (latest version)
  - Or via command: `xcodebuild -downloadPlatform iOS`
  - Verify: `xcrun simctl list devices available`

- [ ] **At least one iOS Simulator available**
  - Verify: `xcrun simctl list devices available | grep iPhone`
  - Should show at least one iPhone simulator

---

## ✅ Phase 7: React Native Setup

### React Native CLI
- [ ] **React Native CLI available** (via npx, no global install needed)
  - Verify: `npx react-native --version`
  
- [ ] **OR install globally** (optional):
  - Install: `npm install -g react-native-cli`
  - Verify: `react-native --version`

### Metro Bundler
- [ ] **Metro bundler can start** (will be tested during project setup)
  - Port 8081 should be available
  - Verify: `lsof -ti:8081` (should be empty or you can kill existing process)

---

## ✅ Phase 8: Account & Authentication Setup

### GitHub Account
- [ ] **GitHub account created**
  - Sign up: https://github.com/join
  
- [ ] **GitHub Personal Access Token (PAT) created**
  - Go to: https://github.com/settings/tokens
  - Generate new token (classic)
  - Scopes needed: `repo` (full control)
  - Save token securely (you won't see it again)

- [ ] **SSH keys configured** (Optional but recommended)
  - Generate: `ssh-keygen -t ed25519 -C "your.email@example.com"`
  - Add to GitHub: https://github.com/settings/keys
  - Verify: `ssh -T git@github.com`

### Apple Developer Account (for iOS production builds)
- [ ] **Apple Developer account** (Optional for development)
  - Sign up: https://developer.apple.com/programs/
  - Required for: App Store distribution, TestFlight
  - Note: Free account works for simulator testing

### Google Play Console (for Android production)
- [ ] **Google Play Console account** (Optional for development)
  - Sign up: https://play.google.com/console/
  - Required for: Play Store distribution
  - Note: Not needed for development/testing

---

## ✅ Phase 9: Network & Security Setup

### Firewall & Ports
- [ ] **Ports available** (check if not in use):
  - [ ] Port 5001 (Backend API)
  - [ ] Port 5173 (Web dev server)
  - [ ] Port 8081 (Metro bundler)
  - [ ] Port 27017 (MongoDB)
  
- [ ] **Firewall configured** (if needed)
  - Allow Node.js, MongoDB, Android Studio, Xcode through firewall

### SSL Certificates (if needed)
- [ ] **Java keystore configured** (for Android SSL issues)
  - Location: Usually auto-configured
  - Note: May need manual certificate import if SSL errors occur

---

## ✅ Phase 10: Verification & Testing

### Backend Verification
- [ ] **MongoDB connection test**
  ```bash
  mongosh
  use reminderdb
  db.version()
  exit
  ```

- [ ] **Node.js project can initialize**
  ```bash
  cd backend
  npm install
  npm start
  # Should start without errors
  ```

### Web Verification
- [ ] **Vite dev server can start**
  ```bash
  cd web
  npm install
  npm run dev
  # Should open browser or show localhost URL
  ```

### Android Verification
- [ ] **Android emulator can start**
  - Open Android Studio → AVD Manager → Start emulator
  - Verify: Emulator window opens and shows Android home screen

- [ ] **ADB recognizes device**
  ```bash
  adb devices
  # Should show emulator or connected device
  ```

- [ ] **React Native Android can build** (after project setup)
  ```bash
  cd mobile
  npm install --legacy-peer-deps
  npm run android
  # Should build and launch app
  ```

### iOS Verification
- [ ] **iOS Simulator can launch**
  ```bash
  open -a Simulator
  # Should open simulator window
  ```

- [ ] **CocoaPods can install** (after project setup)
  ```bash
  cd mobile/ios
  pod install
  # Should complete without errors
  ```

- [ ] **React Native iOS can build** (after project setup)
  ```bash
  cd mobile
  npm run ios
  # Should build and launch app
  ```

---

## ✅ Phase 11: Project-Specific Setup

### Repository Setup
- [ ] **Repository cloned or created**
  - Clone: `git clone <repository-url>`
  - Or create new: `git init`
  
- [ ] **Branch strategy understood**
  - Main/master branch
  - Development branch
  - Feature branches

### Environment Configuration
- [ ] **All .env files created**
  - [ ] `backend/.env`
  - [ ] Any other environment-specific configs

- [ ] **API URLs configured**
  - [ ] Web app API URL: `web/src/api.js`
  - [ ] Mobile app API URL: `mobile/src/services/api.js`

### Dependencies Installation
- [ ] **Backend dependencies installed**
  ```bash
  cd backend
  npm install
  ```

- [ ] **Web dependencies installed**
  ```bash
  cd web
  npm install
  ```

- [ ] **Mobile dependencies installed**
  ```bash
  cd mobile
  npm install --legacy-peer-deps
  ```

- [ ] **iOS pods installed** (macOS only)
  ```bash
  cd mobile/ios
  pod install
  ```

---

## ✅ Phase 12: Development Workflow Setup

### Git Workflow
- [ ] **Git hooks configured** (if project uses them)
  - Pre-commit hooks
  - Commit message format

### Code Quality Tools
- [ ] **ESLint configured** (if project uses it)
  - Verify: `npm run lint` works

- [ ] **Prettier configured** (if project uses it)
  - Verify: `npm run format` works

### Testing Setup
- [ ] **Test framework understood**
  - Jest (React/React Native)
  - Mocha/Chai (Backend)
  - Verify: `npm test` works

---

## 📝 Quick Verification Commands

Run these commands to verify your setup:

```bash
# System
node --version          # Should show v18+ or v20+
npm --version           # Should show 9.x+
git --version           # Should show 2.x+

# Backend
mongod --version        # Should show MongoDB version
java -version           # Should show JDK 11 or 17

# Android
echo $ANDROID_HOME      # Should show Android SDK path
adb devices             # Should list devices/emulators

# iOS (macOS only)
xcodebuild -version     # Should show Xcode version
pod --version           # Should show CocoaPods version
xcrun simctl list       # Should list available simulators
```

---

## 🚨 Common Issues & Solutions

### Issue: Port already in use
**Solution:** 
```bash
# Find process using port
lsof -ti:5001  # Replace with your port
# Kill process
kill -9 <PID>
```

### Issue: Android SDK not found
**Solution:** 
- Verify ANDROID_HOME is set correctly
- Reinstall Android SDK via Android Studio

### Issue: iOS Simulator not available
**Solution:**
```bash
xcodebuild -downloadPlatform iOS
```

### Issue: CocoaPods install fails
**Solution:**
```bash
pod cache clean --all
pod repo update
pod install
```

### Issue: Node version mismatch
**Solution:**
```bash
# Using nvm
nvm install 20.19.4
nvm use 20.19.4
nvm alias default 20.19.4
```

---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Android Developer Guide](https://developer.android.com/studio/intro)
- [iOS Developer Guide](https://developer.apple.com/documentation/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## ✅ Final Checklist Before Starting Development

Before you begin coding, ensure:

- [ ] All Phase 1-11 items are checked
- [ ] All verification commands pass
- [ ] Backend can start and connect to MongoDB
- [ ] Web app can start and connect to backend
- [ ] Android emulator/iOS simulator can launch
- [ ] Mobile app can build (even if it fails initially, build process should work)
- [ ] Git is configured and repository is set up
- [ ] You have access to all required accounts (GitHub, etc.)

---

## 📞 Support

If you encounter issues during setup:

1. Check the [Troubleshooting](#-common-issues--solutions) section
2. Review project-specific README.md
3. Check official documentation for each tool
4. Verify all prerequisites are met

---

**Last Updated:** December 2025  
**Version:** 1.0.0

