#!/bin/bash
# Production dist generator for macOS and Linux

echo "========================================================"
echo "   Re:Zero - Rem Chronicle - Production Build Generator"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null; then
  echo "[ERROR] Node.js is not installed or not in your PATH."
  echo "Please install Node.js from https://nodejs.org/"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "[Step 1/2] Installing dependencies via npm..."
  npm install || npm install --legacy-peer-deps
  if [ $? -ne 0 ]; then
    echo "[ERROR] npm install encountered an error."
    exit 1
  fi
fi

echo "[Step 2/2] Generating production 'dist' directory..."
npm run build

if [ -f "dist/index.html" ]; then
  echo ""
  echo "========================================================"
  echo " [SUCCESS] Production 'dist' directory generated successfully!"
  echo " Location: $(pwd)/dist"
  echo "========================================================"
else
  echo "[ERROR] Build completed but dist/index.html was not found."
  exit 1
fi
