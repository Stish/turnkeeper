@echo off
echo Starting TurnKeeper Mobile Development Server...
echo.
echo Your computer's IP addresses:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /R /C:"IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do echo %%b
)
echo.
echo To test on mobile devices:
echo 1. Make sure your phone/tablet is on the same WiFi network
echo 2. Open browser on mobile device
echo 3. Go to: http://[IP_ADDRESS]:8080
echo    (replace [IP_ADDRESS] with one of the IPs shown above)
echo.
echo Starting server on port 8080...
echo Press Ctrl+C to stop the server
echo.

REM Try different server options
if exist "C:\Program Files\nodejs\node.exe" (
    echo Using Node.js http-server...
    npx http-server -p 8080 -a 0.0.0.0 -c-1
) else if exist "C:\Python*\python.exe" (
    echo Using Python server...
    python -m http.server 8080 --bind 0.0.0.0
) else (
    echo Installing and using Node.js http-server...
    npm install -g http-server
    npx http-server -p 8080 -a 0.0.0.0 -c-1
)

pause
