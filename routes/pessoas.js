const express = require('express');
const router = express.Router();
const pessoas = require('../data/pessoas');

// GET /pessoas/aberto/filtro - Lista pessoas com filtros
router.get('/aberto/filtro', (req, res) => {
  try {
    const {
      nome,
      faixaIdadeInicial,
      faixaIdadeFinal,
      sexo,
      status,
      pagina = 0,
      porPagina = 10
    } = req.query;

    let filteredPessoas = [...pessoas];

    // Aplicar filtros
    if (nome) {
      filteredPessoas = filteredPessoas.filter(p => 
        p.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }

    if (faixaIdadeInicial) {
      const idadeMin = parseInt(faixaIdadeInicial);
      filteredPessoas = filteredPessoas.filter(p => p.idade >= idadeMin);
    }

    if (faixaIdadeFinal) {
      const idadeMax = parseInt(faixaIdadeFinal);
      filteredPessoas = filteredPessoas.filter(p => p.idade <= idadeMax);
    }

    if (sexo) {
      filteredPessoas = filteredPessoas.filter(p => p.sexo === sexo.toUpperCase());
    }

    if (status) {
      if (status === 'ENCONTRADO') {
        filteredPessoas = filteredPessoas.filter(p => p.ultimaOcorrencia.encontradoVivo);
      } else if (status === 'DESAPARECIDO') {
        filteredPessoas = filteredPessoas.filter(p => !p.ultimaOcorrencia.encontradoVivo);
      }
    }

    // Paginação
    const page = parseInt(pagina);
    const size = parseInt(porPagina);
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedPessoas = filteredPessoas.slice(startIndex, endIndex);

    const response = {
      content: paginatedPessoas,
      totalPages: Math.ceil(filteredPessoas.length / size),
      totalElements: filteredPessoas.length,
      size: size,
      number: page
    };

    res.json(response);
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /pessoas/aberto/dinamico - Pessoas aleatórias
router.get('/aberto/dinamico', (req, res) => {
  try {
    const { registros = 5 } = req.query;
    const count = parseInt(registros);
    
    // Embaralhar array e pegar os primeiros N elementos
    const shuffled = [...pessoas].sort(() => 0.5 - Math.random());
    const randomPessoas = shuffled.slice(0, count);
    
    res.json(randomPessoas);
  } catch (error) {
    console.error('Erro ao buscar pessoas aleatórias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /pessoas/aberto/estatistico - Estatísticas
router.get('/aberto/estatistico', (req, res) => {
  try {
    const estatisticas = require('../data/estatisticas');
    res.json(estatisticas);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /pessoas/:id - Detalhes de uma pessoa específica
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    
    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    
    res.json(pessoa);
  } catch (error) {
    console.error('Erro ao buscar pessoa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
