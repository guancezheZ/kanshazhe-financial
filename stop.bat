@echo off
echo Stopping...
taskkill /F /IM node.exe >nul 2>&1
echo [OK] All services stopped.
echo You can close this window now.
timeout /t 3 /nobreak >nul
