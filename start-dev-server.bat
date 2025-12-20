@echo off
echo 🚀 启动 VuePress 开发服务器...
echo.
echo 正在检查依赖...
cd /d "e:\git\FullStack-Voyage"

if not exist "node_modules" (
    echo 未检测到 node_modules，正在安装依赖...
    call pnpm install
)

echo.
echo 启动开发服务器...
echo 预览地址：http://localhost:8080/essential/
echo.
echo 按 Ctrl+C 停止服务器
echo.

call pnpm dev
pause
