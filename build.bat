@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
title Re:Zero Rem Chronicle - Build Dist Folder
color 0A

echo =======================================================================
echo    Re:Zero - Rem Chronicle - Production Build Generator
echo =======================================================================
echo.
echo Current Directory: "!CD!"
echo.

:: Check Node.js
echo [Step 1/3] Checking for Node.js...
where node >nul 2>nul
if errorlevel 1 goto NO_NODE

for /f "tokens=*" %%v in ('node -v') do set NODE_VERSION=%%v
echo [OK] Node.js is installed: !NODE_VERSION!
echo.

:: Check dependencies
echo [Step 2/3] Checking dependencies...
if not exist "node_modules\" goto INSTALL_DEPS
echo [OK] Dependencies already installed.
goto DO_BUILD

:INSTALL_DEPS
echo [INFO] node_modules not found. Installing dependencies via npm...
echo This might take a minute on the first run...
call npm install
if errorlevel 1 (
  echo [NOTICE] Standard install encountered conflict. Retrying with --legacy-peer-deps...
  call npm install --legacy-peer-deps
)
if errorlevel 1 goto NPM_INSTALL_ERROR
echo [OK] Dependencies installed successfully.
echo.

:DO_BUILD
echo [Step 3/3] Building production 'dist' directory...
if exist "node_modules\vite\bin\vite.js" (
  call node "node_modules\vite\bin\vite.js" build
) else (
  call npm run build
)
if errorlevel 1 goto BUILD_ERROR

if not exist "dist\index.html" goto DIST_NOT_FOUND

echo.
echo =======================================================================
echo  [SUCCESS] Production 'dist' folder has been generated successfully!
echo.
echo  Output directory: "!CD!\dist"
echo  Main entry point: "!CD!\dist\index.html"
echo =======================================================================
echo.
echo You can now:
echo  1. Run 'start.bat' to start the local server.
echo  2. Run 'run_offline.bat' to serve the dist folder offline.
echo.
echo Press any key to exit this window...
pause >nul
exit /b 0

:NO_NODE
color 0C
echo.
echo *********************************************************************
echo  [ERROR] Node.js is NOT installed or not in your system PATH!
echo *********************************************************************
echo.
echo To run 'npm run build', you need Node.js installed on your PC.
echo.
echo 1. Download Node.js from: https://nodejs.org/
echo 2. Run the installer and ensure the "Add to PATH" box is checked.
echo 3. Restart your command prompt or run this build.bat file again!
echo.
echo NOTE: A pre-built 'dist' folder is already included with this project!
echo You can run 'run_offline.bat' right away even without Node.js.
echo.
echo Press any key to exit this window...
pause >nul
exit /b 1

:NPM_INSTALL_ERROR
color 0C
echo.
echo [ERROR] 'npm install' failed.
echo Please check your internet connection or run: npm install --legacy-peer-deps
echo.
pause
exit /b 1

:BUILD_ERROR
color 0C
echo.
echo [ERROR] Build command encountered an error.
echo Check the error message above for details.
echo.
pause
exit /b 1

:DIST_NOT_FOUND
color 0C
echo.
echo [ERROR] Build completed but dist\index.html was not found.
echo.
pause
exit /b 1
