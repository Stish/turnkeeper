@echo off
echo =====================================
echo    TurnKeeper PWA Deployment Tool
echo =====================================
echo.

:menu
echo Choose deployment option:
echo 1. Prepare files for GitHub Pages
echo 2. Deploy to Netlify (drag & drop)
echo 3. Deploy to Surge.sh
echo 4. Deploy to Vercel
echo 5. Show deployment URLs
echo 6. Exit
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto github_prep
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto surge
if "%choice%"=="4" goto vercel
if "%choice%"=="5" goto show_urls
if "%choice%"=="6" goto exit
goto menu

:github_prep
echo.
echo =====================================
echo    Preparing for GitHub Pages
echo =====================================
echo.
echo 1. Create a new repository on GitHub.com:
echo    - Name: turnkeeper-pwa
echo    - Make it Public
echo    - Add README.md
echo.
echo 2. Upload these files to your repository:
dir /b *.html *.css *.js *.json
echo    + icons/ folder
echo.
echo 3. Enable GitHub Pages in repository Settings:
echo    - Go to Settings ^> Pages
echo    - Source: Deploy from branch
echo    - Branch: main
echo    - Folder: / (root)
echo.
echo 4. Your app will be live at:
echo    https://YOURUSERNAME.github.io/turnkeeper-pwa
echo.
pause
goto menu

:netlify
echo.
echo =====================================
echo    Deploying to Netlify
echo =====================================
echo.
echo 1. Opening Netlify.com...
start https://netlify.com
echo.
echo 2. Sign up or log in to Netlify
echo 3. Drag and drop this entire folder to Netlify
echo 4. Your app will be live immediately!
echo.
echo Current folder: %cd%
echo.
pause
goto menu

:surge
echo.
echo =====================================
echo    Deploying to Surge.sh
echo =====================================
echo.
echo Installing Surge CLI...
call npm install -g surge
echo.
echo Deploying to Surge...
call surge
echo.
pause
goto menu

:vercel
echo.
echo =====================================
echo    Deploying to Vercel
echo =====================================
echo.
echo Installing Vercel CLI...
call npm install -g vercel
echo.
echo Deploying to Vercel...
call vercel
echo.
pause
goto menu

:show_urls
echo.
echo =====================================
echo    Popular Deployment Platforms
echo =====================================
echo.
echo GitHub Pages: https://pages.github.com
echo Netlify:      https://netlify.com
echo Vercel:       https://vercel.com  
echo Surge:        https://surge.sh
echo Firebase:     https://firebase.google.com
echo.
echo Free tier features comparison:
echo.
echo GitHub Pages:
echo  - Bandwidth: 100GB/month
echo  - Storage: 1GB
echo  - Custom domains: Yes
echo  - HTTPS: Automatic
echo.
echo Netlify:
echo  - Bandwidth: 100GB/month  
echo  - Build minutes: 300/month
echo  - Custom domains: Yes
echo  - HTTPS: Automatic
echo.
echo Vercel:
echo  - Bandwidth: 100GB/month
echo  - Builds: 100/month
echo  - Custom domains: Yes
echo  - HTTPS: Automatic
echo.
pause
goto menu

:exit
echo.
echo Thank you for using TurnKeeper Deployment Tool!
echo Your PWA will be accessible worldwide once deployed.
echo.
pause
exit
