@echo off
REM Full-Stack Project Template Setup Script (Windows)
REM This script helps you customize this template for your new project

setlocal enabledelayedexpansion

echo ╔════════════════════════════════════════════════════════════╗
echo ║     Full-Stack Project Template Setup                     ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if template.config.json exists
if not exist "template.config.json" (
    echo ❌ Error: template.config.json not found!
    echo Please ensure you're running this script from the project root.
    exit /b 1
)

echo 📝 Let's customize your project!
echo.

REM Get project information
set /p PROJECT_NAME="Project Name (lowercase, no spaces, e.g., 'myapp') [reminder-app]: "
if "!PROJECT_NAME!"=="" set PROJECT_NAME=reminder-app

set /p PROJECT_DISPLAY_NAME="Project Display Name (e.g., 'My Awesome App') [Daily Reminder App]: "
if "!PROJECT_DISPLAY_NAME!"=="" set PROJECT_DISPLAY_NAME=Daily Reminder App

set /p PROJECT_DESCRIPTION="Project Description [A full-stack daily reminder application]: "
if "!PROJECT_DESCRIPTION!"=="" set PROJECT_DESCRIPTION=A full-stack daily reminder application

set /p AUTHOR_NAME="Author Name [Your Name]: "
if "!AUTHOR_NAME!"=="" set AUTHOR_NAME=Your Name

set /p AUTHOR_EMAIL="Author Email [your.email@example.com]: "
if "!AUTHOR_EMAIL!"=="" set AUTHOR_EMAIL=your.email@example.com

echo.
echo 🔧 Backend Configuration
set /p BACKEND_PORT="Backend Port [5001]: "
if "!BACKEND_PORT!"=="" set BACKEND_PORT=5001

set /p DATABASE_NAME="Database Name [reminderdb]: "
if "!DATABASE_NAME!"=="" set DATABASE_NAME=reminderdb

echo.
echo 📱 Mobile App Configuration
set /p PACKAGE_NAME="Package Name (e.g., 'myapp' for com.myapp) [reminderapp]: "
if "!PACKAGE_NAME!"=="" set PACKAGE_NAME=reminderapp

set /p APP_NAME="App Name (no spaces, e.g., 'MyApp') [ReminderApp]: "
if "!APP_NAME!"=="" set APP_NAME=ReminderApp

set /p APP_DISPLAY_NAME="App Display Name (shown to users) [Reminder App]: "
if "!APP_DISPLAY_NAME!"=="" set APP_DISPLAY_NAME=Reminder App

echo.
echo 🗄️  API Configuration
set /p MODEL_NAME="Model Name (singular, e.g., 'Reminder') [Reminder]: "
if "!MODEL_NAME!"=="" set MODEL_NAME=Reminder

set /p ROUTE_PREFIX="Route Prefix (plural, e.g., 'reminders') [reminders]: "
if "!ROUTE_PREFIX!"=="" set ROUTE_PREFIX=reminders

echo.
echo 🔄 Starting replacements...
echo.

REM Update template.config.json
echo 📄 Updating template.config.json...
powershell -Command "(Get-Content template.config.json) -replace 'reminder-app', '!PROJECT_NAME!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace 'Daily Reminder App', '!PROJECT_DISPLAY_NAME!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace 'A full-stack daily reminder application', '!PROJECT_DESCRIPTION!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace 'Your Name', '!AUTHOR_NAME!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace 'your.email@example.com', '!AUTHOR_EMAIL!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace '5001', '!BACKEND_PORT!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace 'reminderdb', '!DATABASE_NAME!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace 'reminderapp', '!PACKAGE_NAME!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace 'ReminderApp', '!APP_NAME!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace 'Reminder App', '!APP_DISPLAY_NAME!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace 'Reminder', '!MODEL_NAME!' | Set-Content template.config.json"
powershell -Command "(Get-Content template.config.json) -replace '\"reminders\"', '\"!ROUTE_PREFIX!\"' | Set-Content template.config.json"

REM Update backend files
echo 🔙 Updating backend files...
if exist "backend\package.json" (
    powershell -Command "(Get-Content backend\package.json) -replace 'reminder-app-backend', '!PROJECT_NAME!-backend' | Set-Content backend\package.json"
    powershell -Command "(Get-Content backend\package.json) -replace 'Daily Reminder App Backend', '!PROJECT_DISPLAY_NAME! Backend' | Set-Content backend\package.json"
)

if exist "backend\.env.example" (
    powershell -Command "(Get-Content backend\.env.example) -replace '5001', '!BACKEND_PORT!' | Set-Content backend\.env.example"
    powershell -Command "(Get-Content backend\.env.example) -replace 'reminderdb', '!DATABASE_NAME!' | Set-Content backend\.env.example"
)

REM Update web files
echo 🌐 Updating web files...
if exist "web\package.json" (
    powershell -Command "(Get-Content web\package.json) -replace 'reminder-app-web', '!PROJECT_NAME!-web' | Set-Content web\package.json"
)

if exist "web\index.html" (
    powershell -Command "(Get-Content web\index.html) -replace 'Daily Reminder App', '!PROJECT_DISPLAY_NAME!' | Set-Content web\index.html"
)

REM Update mobile files
echo 📱 Updating mobile files...
if exist "mobile\package.json" (
    powershell -Command "(Get-Content mobile\package.json) -replace 'reminder-app-mobile', '!PROJECT_NAME!-mobile' | Set-Content mobile\package.json"
)

if exist "mobile\index.js" (
    powershell -Command "(Get-Content mobile\index.js) -replace 'ReminderApp', '!APP_NAME!' | Set-Content mobile\index.js"
)

REM Update Android files
if exist "mobile\android\app\build.gradle" (
    powershell -Command "(Get-Content mobile\android\app\build.gradle) -replace 'com.reminderapp', 'com.!PACKAGE_NAME!' | Set-Content mobile\android\app\build.gradle"
)

if exist "mobile\android\settings.gradle" (
    powershell -Command "(Get-Content mobile\android\settings.gradle) -replace 'ReminderApp', '!APP_NAME!' | Set-Content mobile\android\settings.gradle"
)

if exist "mobile\android\app\src\main\res\values\strings.xml" (
    powershell -Command "(Get-Content mobile\android\app\src\main\res\values\strings.xml) -replace 'Reminder App', '!APP_DISPLAY_NAME!' | Set-Content mobile\android\app\src\main\res\values\strings.xml"
)

echo.
echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo   1. Review and update template.config.json if needed
echo   2. Update Android package names in:
echo      - mobile\android\app\build.gradle
echo      - mobile\android\app\src\main\java\com\!PACKAGE_NAME!\
echo   3. Update iOS bundle ID in Xcode project
echo   4. Run: cd backend ^&^& npm install
echo   5. Run: cd web ^&^& npm install
echo   6. Run: cd mobile ^&^& npm install --legacy-peer-deps
echo   7. For iOS: cd mobile\ios ^&^& pod install
echo.
echo 🎉 Your project template is ready!
echo.

endlocal

