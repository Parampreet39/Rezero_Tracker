#!/bin/bash
# Re:Zero - Rem Chronicle local launcher for macOS and Linux

echo "========================================================"
echo "   Re:Zero - Rem Chronicle (Starting Life from Zero)"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null; then
  echo "[ERROR] Node.js is not found in your PATH."
  echo "Please install Node.js from https://nodejs.org/"
  echo "Alternatively, you can run './run_offline.sh' if Python is installed!"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "[1/2] Installing dependencies with npm..."
  npm install || npm install --legacy-peer-deps
  if [ $? -ne 0 ]; then
    echo "[ERROR] npm install encountered an error."
    exit 1
  fi
fi

echo "[2/2] Launching development server on http://localhost:3000 ..."
(sleep 2 && (open http://localhost:3000 2>/dev/null || xdg-open http://localhost:3000 2>/dev/null || sensible-browser http://localhost:3000 2>/dev/null)) &

npm run dev
