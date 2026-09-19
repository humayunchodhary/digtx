@echo off
echo ===================================================
echo   DigitX Pro - Automatic Git Commit and Push Script
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/4] Initializing Git...
git init
git branch -M main

echo [2/4] Adding modified files...
git add .

echo [3/4] Committing changes...
git commit -m "Rebrand store to DigitX Pro and upgrade all product images"

echo [4/4] Setting remote and pushing to GitHub...
git remote remove origin >nul 2>&1

:: Try digtx repository
git remote add origin https://github.com/humayunchodhary/digtx.git
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ---------------------------------------------------
    echo Pushing to 'digtx' failed. Trying 'digitxpro'...
    echo ---------------------------------------------------
    git remote remove origin >nul 2>&1
    git remote add origin https://github.com/humayunchodhary/digitxpro.git
    git push -u origin main
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ---------------------------------------------------
    echo Trying 'digitx'...
    echo ---------------------------------------------------
    git remote remove origin >nul 2>&1
    git remote add origin https://github.com/humayunchodhary/digitx.git
    git push -u origin main
)

echo.
echo ===================================================
echo   Done!
echo ===================================================
pause
