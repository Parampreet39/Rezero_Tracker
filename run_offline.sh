#!/bin/bash
# Offline launcher using Python standard library

if command -v python3 &> /dev/null; then
  python3 serve_offline.py
elif command -v python &> /dev/null; then
  python serve_offline.py
else
  echo "[INFO] Python not found. Falling back to Node development server..."
  ./start.sh
fi
