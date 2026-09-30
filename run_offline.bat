@echo off
setlocal
cd /d "%~dp0"
title Re:Zero - Rem Chronicle (Offline Runner)
color 0B

echo ========================================================
echo    Re:Zero - Rem Chronicle (Offline Production Runner)
echo ========================================================
echo.

:: 1. Check Python
where python >nul 2>nul
if not errorlevel 1 (
    echo [OK] Python detected. Starting offline server...
    python serve_offline.py
    goto END
)

:: 2. Check Python3
where python3 >nul 2>nul
if not errorlevel 1 (
    echo [OK] Python 3 detected. Starting offline server...
    python3 serve_offline.py
    goto END
)

:: 3. Check PowerShell (built-in on Windows 10/11)
where powershell >nul 2>nul
if not errorlevel 1 (
    echo [OK] Windows PowerShell detected. Starting built-in server...
    powershell -ExecutionPolicy Bypass -File serve_offline.ps1
    goto END
)

:: 4. Check Node.js
where node >nul 2>nul
if not errorlevel 1 (
    echo [INFO] Python/PowerShell not found. Running start.bat with Node.js...
    call start.bat
    goto END
)

color 0C
echo.
echo [ERROR] No server runner (Python, PowerShell, or Node) could be executed.
echo Please install Node.js from https://nodejs.org/ or Python from https://python.org/
echo.

:END
echo.
echo Window will remain open. Press any key to exit...
pause >nul
