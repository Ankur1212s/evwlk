@echo off
title Push Evening Walk to GitHub
cd /d "%~dp0"
echo ========================================================
echo  Pushing to https://github.com/Ankur1212s/evwlk.git
echo ========================================================
echo.
echo If a GitHub login window or browser tab appears, 
echo click "Sign in with your browser" or "Authorize".
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  [SUCCESS] Code is uploaded to GitHub!
    echo  Now go to https://vercel.com/new and click Import!
    echo ========================================================
) else (
    echo.
    echo Push could not complete. Check chat for 1-click alternative!
)
pause
