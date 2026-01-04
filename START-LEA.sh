#!/bin/bash
# LEA Launcher - Discovery Verification System
# Instructions: Open Terminal, drag this file into Terminal, press Enter

cd "$(dirname "$0")"

echo "=========================================="
echo "  Starting LEA Discovery System..."
echo "=========================================="

# Kill any existing server
lsof -ti:8888 | xargs kill -9 2>/dev/null

# Start server
echo "Starting web server..."
python3 -m http.server 8888 > /dev/null 2>&1 &
SERVER_PID=$!

sleep 2

# Open browser
echo "Opening LEA in your browser..."
open "http://localhost:8888/index.html"

echo ""
echo "✅ LEA is now running!"
echo "📍 URL: http://localhost:8888/index.html"
echo ""
echo "To stop: Press Ctrl+C in this window"
echo "         or run: kill $SERVER_PID"
echo ""

# Keep server running
wait $SERVER_PID
