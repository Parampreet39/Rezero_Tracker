@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
title Re:Zero Rem Chronicle - Local Setup and Runner
color 0B

echo =======================================================================
echo    Re:Zero - Rem Chronicle (Web Novel and Completionist Tracker)
echo =======================================================================
echo.
echo Current Directory: "!CD!"
echo.

:: 1. Verify Node.js is installed
echo [Step 1/4] Checking for Node.js environment...
where node >nul 2>nul
if errorlevel 1 goto NO_NODE

for /f "tokens=*" %%v in ('node -v') do set NODE_VERSION=%%v
echo [OK] Node.js detected: !NODE_VERSION!
echo.

:: 2. Check and install dependencies
echo [Step 2/4] Checking dependencies in node_modules...
if not exist "node_modules\" goto INSTALL_DEPS
echo [OK] Dependencies already installed.
goto BUILD_CHECK

:INSTALL_DEPS
echo [INFO] First-time setup: installing dependencies via npm...
echo This may take 1-2 minutes depending on your internet connection.
call npm install
if errorlevel 1 (
  echo [NOTICE] Standard install encountered conflict. Retrying with --legacy-peer-deps...
  call npm install --legacy-peer-deps
)
if errorlevel 1 goto NPM_ERROR
echo [OK] Dependencies installed successfully.
echo.

:BUILD_CHECK
:: 3. Generate dist folder
echo [Step 3/4] Checking production 'dist' folder...
if exist "dist\index.html" goto DIST_EXISTS

echo [INFO] Generating production 'dist' folder...
if exist "node_modules\vite\bin\vite.js" (
  call node "node_modules\vite\bin\vite.js" build
) else (
  call npm run build
)
if errorlevel 1 goto BUILD_WARN
echo [OK] Production 'dist' folder generated successfully!
goto START_DEV

:DIST_EXISTS
echo [OK] 'dist' folder is present and ready.
goto START_DEV

:BUILD_WARN
echo [WARNING] Build command finished with warnings. Continuing to server...
goto START_DEV

:START_DEV
:: 4. Launch local dev server and open browser
echo.
echo [Step 4/4] Starting local server at http://localhost:3000 ...
echo Opening your default browser now...
echo.
echo =======================================================================
echo  App is running! Keep this window open while using the application.
echo  To stop the server, press Ctrl+C in this window.
echo =======================================================================
echo.

start http://localhost:3000

if exist "node_modules\vite\bin\vite.js" (
  call node "node_modules\vite\bin\vite.js" --port=3000 --host=0.0.0.0
) else (
  call npm run dev
)

if errorlevel 1 (
  echo.
  echo Server stopped or encountered an error.
  pause
)
exit /b 0

:: =======================================================================
:: Fallback Handlers (Node not installed or error)
:: =======================================================================

:NO_NODE
color 0E
echo.
echo ---------------------------------------------------------------------
echo  [NOTICE] Node.js is not found in your system PATH.
echo ---------------------------------------------------------------------
echo.
echo Checking for Python or Windows PowerShell to run in offline mode...
echo.

:: Check Python fallback
where python >nul 2>nul
if errorlevel 1 goto CHECK_PYTHON3
echo [OK] Python detected! Launching offline server now...
python serve_offline.py
goto SERVER_FINISHED

:CHECK_PYTHON3
where python3 >nul 2>nul
if errorlevel 1 goto CHECK_POWERSHELL
echo [OK] Python3 detected! Launching offline server now...
python3 serve_offline.py
goto SERVER_FINISHED

:CHECK_POWERSHELL
where powershell >nul 2>nul
if errorlevel 1 goto SHOW_NODE_INSTALL_HELP
echo [OK] Windows PowerShell detected! Launching offline server now...
powershell -ExecutionPolicy Bypass -File serve_offline.ps1
goto SERVER_FINISHED

:SHOW_NODE_INSTALL_HELP
color 0C
echo.
echo *********************************************************************
echo  [ERROR] Neither Node.js, Python, nor PowerShell was available.
echo *********************************************************************
echo.
echo To run this application locally:
echo   1. Download Node.js from https://nodejs.org/
echo   2. Run the installer and check the box "Add to PATH".
echo   3. Double-click this start.bat file again!
echo.
echo Press any key to exit this window...
pause >nul
exit /b 1

:NPM_ERROR
color 0C
echo.
echo [ERROR] npm install encountered an error.
echo Please check your internet connection or run: npm install --legacy-peer-deps
echo.
pause
exit /b 1

:SERVER_FINISHED
echo.
echo Server has stopped.
pause
exit /b 0
