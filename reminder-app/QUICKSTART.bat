@echo off
REM Daily Reminder App - Quick Start (Windows)

echo.
echo ======================================================
echo     Daily Reminder App - Quick Start
echo ======================================================
echo.

REM Check if Node.js is installed
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed.
    echo Please install Node.js 14+ from https://nodejs.org/
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo [OK] Node.js %%i found

REM Check if MongoDB is installed
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: MongoDB is not found in PATH.
    echo Make sure MongoDB is running before starting the apps.
    echo Download: https://www.mongodb.com/try/download/community
)

echo.
echo Setting up Backend...
cd backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)
echo [OK] Backend ready
cd ..

echo.
echo Setting up Web App...
cd web
if not exist "node_modules" (
    echo Installing web dependencies...
    call npm install
)
echo [OK] Web app ready
cd ..

echo.
echo Setting up Mobile App...
cd mobile
if not exist "node_modules" (
    echo Installing mobile dependencies...
    call npm install
)
echo [OK] Mobile app ready
cd ..

echo.
echo ======================================================
echo     Setup Complete! Next Steps:
echo ======================================================
echo.
echo 1. Start MongoDB (in a terminal):
echo    mongod
echo.
echo 2. Start Backend (in a new terminal):
echo    cd backend ^&^& npm start
echo    ^> Server will run on http://localhost:5000
echo.
echo 3. Start Web App (in a new terminal):
echo    cd web ^&^& npm run dev
echo    ^> App will run on http://localhost:5173
echo.
echo 4. Start Mobile App (in a new terminal):
echo    cd mobile ^&^& npm run android
echo    OR
echo    cd mobile ^&^& npm run ios
echo.
echo Documentation:
echo   - Main README: ./README.md
echo   - Implementation Guide: ./IMPLEMENTATION_GUIDE.md
echo   - Task Tracking: ./TASK_TRACKING.md
echo   - API Documentation: ./API_DOCUMENTATION.yaml
echo   - Postman Collection: ./POSTMAN_COLLECTION.json
echo.
echo Testing:
echo   - Import POSTMAN_COLLECTION.json into Postman
echo   - Create test reminders
echo   - Check notifications in all apps
echo.
pause
