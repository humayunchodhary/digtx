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

echo [2/3] Setting remote repository for humayunchodhary...
git remote remove origin >nul 2>&1
git remote add origin https://humayunchodhary@github.com/humayunchodhary/digtx.git

echo [3/3] Pushing to GitHub...
echo.
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ---------------------------------------------------
    echo Retrying with standard URL...
    git remote set-url origin https://github.com/humayunchodhary/digtx.git
    git push -u origin main
)

echo.
echo ===================================================
echo   Finished!
echo ===================================================
pause
