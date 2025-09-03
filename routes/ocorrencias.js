const express = require('express');
const multer = require('multer');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Configuração do multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5 // Máximo 5 arquivos
  },
  fileFilter: (req, file, cb) => {
    // Aceitar apenas imagens e PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não suportado. Apenas imagens e PDFs são permitidos.'), false);
    }
  }
});

// POST /ocorrencias/informacoes-desaparecido - Enviar informações sobre desaparecido
router.post('/informacoes-desaparecido', upload.array('files', 5), (req, res) => {
  try {
    const { ocoId, informacao, descricao, data } = req.body;
    const files = req.files;

    // Validações básicas
    if (!ocoId) {
      return res.status(400).json({ 
        error: 'ID da ocorrência é obrigatório' 
      });
    }

    if (!informacao || !descricao || !data) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios' 
      });
    }

    // Simular processamento dos arquivos
    const processedFiles = files ? files.map(file => ({
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      fileId: uuidv4()
    })) : [];

    // Simular resposta de sucesso
    const response = {
      success: true,
      message: 'Informações enviadas com sucesso',
      data: {
        ocoId: parseInt(ocoId),
        informacao,
        descricao,
        data,
        files: processedFiles,
        submittedAt: new Date().toISOString(),
        submissionId: uuidv4()
      }
    };

    // Simular delay de processamento
    setTimeout(() => {
      res.status(200).json(response);
    }, 1000);

  } catch (error) {
    console.error('Erro ao processar informações:', error);
    
    if (error.message.includes('Tipo de arquivo')) {
      return res.status(400).json({ 
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// GET /ocorrencias/:id - Buscar detalhes de uma ocorrência
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Simular dados de ocorrência
    const ocorrencia = {
      id: id,
      numero: `OC${id.toString().padStart(6, '0')}`,
      dataRegistro: new Date().toISOString(),
      status: 'ATIVA',
      pessoa: {
        id: Math.floor(Math.random() * 10) + 1,
        nome: 'Nome da Pessoa',
        idade: 25,
        sexo: 'MASCULINO'
      },
      localDesaparecimento: 'Cuiabá - MT',
      dataDesaparecimento: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      informacoes: [
        {
          id: 1,
          informacao: 'Informação adicional sobre o desaparecimento',
          descricao: 'Detalhes sobre a última vez que foi visto',
          data: new Date().toISOString(),
          files: []
        }
      ]
    };

    res.json(ocorrencia);
  } catch (error) {
    console.error('Erro ao buscar ocorrência:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Middleware para tratamento de erros do multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'Arquivo muito grande. Tamanho máximo: 10MB' 
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        error: 'Muitos arquivos. Máximo: 5 arquivos' 
      });
    }
  }
  next(error);
});

module.exports = router;
