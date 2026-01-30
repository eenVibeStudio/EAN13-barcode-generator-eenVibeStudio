@echo off
chcp 65001 >nul
echo ========================================
echo   EAN-13 条形码生成器 - 本地服务器
echo ========================================
echo.
echo 正在启动本地服务器...
echo.
echo 服务器地址: http://localhost:8000
echo.
echo 按 Ctrl+C 可以停止服务器
echo ========================================
echo.

python -m http.server 8000

pause
