@echo off
title Push Evening Walk Website to GitHub
cd /d "%~dp0"
echo ========================================================
echo  Deploy Evening Walk Website to GitHub for Vercel
echo ========================================================
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/yourname/evening-walk.git): "

if "%REPO_URL%"=="" (
    echo No URL entered. Exiting.
    pause
    exit /b
)

git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

echo.
echo ========================================================
echo  Code pushed to GitHub successfully!
echo  Now go to https://vercel.com/new and click Import!
echo ========================================================
pause
