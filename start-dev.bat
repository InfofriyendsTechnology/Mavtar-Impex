@echo off
echo ============================================================
echo   Starting Mavtar Impex E-Commerce Platform
echo ============================================================
echo.
echo 1. Starting Backend API on http://localhost:1653 ...
start "Mavtar Impex Backend (Port 1653)" cmd /k "cd backend && npm run dev"

echo.
echo 2. Starting Frontend Public Store on http://localhost:1053 ...
start "Mavtar Impex Storefront (Port 1053)" cmd /k "cd frontend && npm run dev:store"

echo.
echo 3. Starting Admin Panel on http://localhost:2253 ...
start "Mavtar Impex Admin Panel (Port 2253)" cmd /k "cd frontend && npm run dev:admin"

echo.
echo ============================================================
echo   Public Storefront: http://localhost:1053
echo   Admin Panel:       http://localhost:2253
echo   Backend API:       http://localhost:1653/api/health
echo ============================================================
pause
