@echo off
echo ========================================
echo    Instalando Fake API para Desaparecidos
echo ========================================
echo.

echo Instalando dependencias...
npm install

if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias!
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Dependencias instaladas com sucesso!
echo ========================================
echo.
echo Para executar a API:
echo   npm run generate-data  (gerar dados basicos)
echo   npm run generate-large (gerar dataset grande)
echo   npm run dev            (desenvolvimento com auto-reload)
echo   npm start              (producao)
echo   npm test               (testar API)
echo.
echo A API estara disponivel em: http://localhost:3001
echo.
pause
