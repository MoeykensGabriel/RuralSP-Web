@echo off
title GB Seguridad - servidor de desarrollo

REM ---------------------------------------------------------------------
REM  Levanta el sitio en modo desarrollo.
REM
REM  OJO: este archivo esta escrito SIN acentos ni simbolos raros a
REM  proposito. cmd.exe lee los .bat con la codepage del sistema y
REM  cualquier caracter no-ASCII le rompe el parseo de la linea.
REM ---------------------------------------------------------------------

REM Se para en la carpeta de este archivo, sin importar desde donde se ejecute.
cd /d "%~dp0"

echo.
echo   ==================================
echo    GB SEGURIDAD - modo desarrollo
echo   ==================================
echo.

REM --- Node instalado? -------------------------------------------------
where node >nul 2>nul
if errorlevel 1 (
    echo   [ERROR] No se encontro Node.js en esta maquina.
    echo.
    echo   Instalalo desde https://nodejs.org (version LTS^)
    echo   y volve a ejecutar este archivo.
    echo.
    pause
    exit /b 1
)

REM --- Dependencias instaladas? ----------------------------------------
if not exist "node_modules" (
    echo   Primera vez en esta maquina: instalando dependencias.
    echo   Tarda un par de minutos, es solo esta vez.
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo   [ERROR] Fallo la instalacion de dependencias.
        echo   Revisa tu conexion a internet y proba de nuevo.
        echo.
        pause
        exit /b 1
    )
    echo.
)

echo   Levantando el servidor...
echo   El navegador se abre solo cuando este listo.
echo.
echo   Para cortarlo: Ctrl+C o cerra esta ventana.
echo.

REM --open hace que Vite abra el navegador recien cuando el server responde.
call npm run dev -- --open

REM Si llegamos aca el servidor se detuvo: dejamos la ventana abierta
REM para poder leer el error.
echo.
echo   El servidor se detuvo.
pause
