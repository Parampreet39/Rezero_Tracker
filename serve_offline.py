#!/usr/bin/env python3
"""
Zero-dependency offline server for Re:Zero - Rem Chronicle.
Runs using only the Python standard library. No packages needed.
"""
import http.server
import socketserver
import os
import sys
import webbrowser
import subprocess

PORT = 3000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, 'dist')

# If dist folder doesn't exist, try building it if npm is available
if not os.path.exists(DIST_DIR) or not os.path.exists(os.path.join(DIST_DIR, 'index.html')):
    print("[INFO] 'dist' folder not found. Attempting to build production files via npm...")
    try:
        subprocess.run(["npm", "run", "build"], cwd=BASE_DIR, check=True)
    except Exception:
        pass

# Select directory to serve
if os.path.exists(DIST_DIR) and os.path.exists(os.path.join(DIST_DIR, 'index.html')):
    DIRECTORY = DIST_DIR
else:
    DIRECTORY = BASE_DIR

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        sys.stderr.write(f"[{self.log_date_time_string()}] {args[0]}\n")

    def do_GET(self):
        # SPA routing fallback: if path doesn't exist on disk, serve index.html
        path = self.translate_path(self.path)
        if not os.path.exists(path) and not '.' in os.path.basename(self.path):
            self.path = '/index.html'
        return super().do_GET()

print("=" * 60)
print(" Re:Zero - Rem Chronicle (Offline Production Server)")
print("=" * 60)
print(f" Serving build from: {DIRECTORY}")
print(f" URL:                http://localhost:{PORT}")
print(" Press Ctrl+C in this terminal to stop the server.")
print("=" * 60)

try:
    webbrowser.open(f"http://localhost:{PORT}")
except Exception:
    pass

socketserver.TCPServer.allow_reuse_address = True
try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n[INFO] Server stopped gracefully.")
except OSError as e:
    print(f"\n[NOTICE] Port {PORT} is busy, attempting port 3001...")
    try:
        with socketserver.TCPServer(("", 3001), Handler) as httpd:
            print(" Serving at: http://localhost:3001")
            httpd.serve_forever()
    except Exception as err:
        print(f"[ERROR] Could not start server: {err}")
