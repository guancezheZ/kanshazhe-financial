@echo off
title Financial Management System

echo ========================================
echo   Financial Management System
echo   Starting...
echo ========================================
echo.

cd /d "%~dp0"

if not exist "node_modules\" (
    echo [First run] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Install failed. Make sure Node.js is installed.
        echo Download: https://nodejs.org/
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
)

echo [Cleanup] Releasing ports...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [Launch] Starting dev server...
start "" cmd /c "cd /d "%~dp0" && npx vite --port 3000 --host"

timeout /t 3 /nobreak >nul

echo [OK] Opening browser...
start http://localhost:3000

echo.
echo ========================================
echo   System is UP!
echo   URL: http://localhost:3000
echo.
echo   Login: admin
echo   Password: admin123
echo.
echo   To stop: double-click stop.bat
echo ========================================
echo.
pause
