const express = require('express');
const cors = require('cors');
const pessoasRoutes = require('./routes/pessoas');
const ocorrenciasRoutes = require('./routes/ocorrencias');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Fake API está funcionando!'
  });
});

// Rotas
app.use('/v1/pessoas', pessoasRoutes);
app.use('/v1/ocorrencias', ocorrenciasRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Fake API para Desaparecidos',
    version: '1.0.0',
    endpoints: {
      pessoas: '/v1/pessoas',
      ocorrencias: '/v1/ocorrencias',
      health: '/health'
    },
    documentation: {
      pessoas: {
        'GET /v1/pessoas/aberto/filtro': 'Lista pessoas com filtros e paginação',
        'GET /v1/pessoas/aberto/dinamico': 'Pessoas aleatórias',
        'GET /v1/pessoas/aberto/estatistico': 'Estatísticas',
        'GET /v1/pessoas/:id': 'Detalhes de uma pessoa'
      },
      ocorrencias: {
        'POST /v1/ocorrencias/informacoes-desaparecido': 'Enviar informações sobre desaparecido',
        'GET /v1/ocorrencias/:id': 'Detalhes de uma ocorrência'
      }
    }
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Fake API rodando na porta ${PORT}`);
  console.log(`📖 Documentação: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Pessoas: http://localhost:${PORT}/v1/pessoas`);
  console.log(`📋 Ocorrências: http://localhost:${PORT}/v1/ocorrencias`);
});

module.exports = app;
