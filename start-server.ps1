Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  EAN-13 条形码生成器 - 本地服务器" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "正在启动本地服务器..." -ForegroundColor Yellow
Write-Host ""
Write-Host "服务器地址: http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "按 Ctrl+C 可以停止服务器" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 尝试使用Python启动服务器
try {
    python -m http.server 8000
} catch {
    Write-Host "Python未找到，尝试使用其他方法..." -ForegroundColor Yellow
    # 如果Python不可用，可以使用Node.js或其他方法
    Write-Host "请确保已安装Python，或直接双击index.html文件打开" -ForegroundColor Red
    Read-Host "按Enter键退出"
}
