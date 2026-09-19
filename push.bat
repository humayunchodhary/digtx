@echo off
echo ===================================================
echo   DigitX Pro - Pushing to humayunchodhary/digtx
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Adding changes and staging...
git add .
git commit -m "Rebrand store to DigitX Pro (@digitxpro) and upgrade all product images" >nul 2>&1
git branch -M main

echo [2/3] Setting remote repository...
git remote remove origin >nul 2>&1
git remote add origin https://humayunchodhary@github.com/humayunchodhary/digtx.git

echo [3/3] Force pushing updated codebase to GitHub...
echo.
git push -u origin main --force

echo.
echo ===================================================
echo   Finished! Check https://github.com/humayunchodhary/digtx
echo ===================================================
pause
