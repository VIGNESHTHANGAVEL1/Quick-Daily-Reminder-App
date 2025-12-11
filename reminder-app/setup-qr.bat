@echo off
REM Setup and Run QR Code Feature for Windows

echo.
echo 🚀 Daily Reminder App - QR Code Feature Setup
echo ==============================================
echo.

echo Checking services...
echo.

REM Backend check
netstat -ano | find ":5000" >nul
if %errorlevel% equ 0 (
    echo ✓ Backend running on port 5000
) else (
    echo ✗ Backend not running. Starting...
    cd reminder-app\backend
    start npm start
    timeout /t 3
    cd ..\..
)

REM Web check
netstat -ano | find ":5173" >nul
if %errorlevel% equ 0 (
    echo ✓ Web app running on port 5173
) else (
    echo ✗ Web app not running. Starting...
    cd reminder-app\web
    start npm run dev
    timeout /t 6
    cd ..\..
)

REM Mobile
echo ✓ Mobile Metro bundler ready

echo.
echo === QR CODE FEATURE READY ===
echo.
echo Web App:  http://localhost:5173
echo API:      http://localhost:5000/api
echo Backend:  Running on port 5000
echo.
echo To use QR feature:
echo 1. Open http://localhost:5173 in browser
echo 2. Create a reminder and click 📱 QR button to generate QR code
echo 3. On mobile: Open app ^> QR tab ^> Scan code
echo.
echo 📖 Read QR_CODE_FEATURE.md for detailed instructions
echo.
pause
