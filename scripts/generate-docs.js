const fs = require('fs');
const path = require('path');

function gerarDocumentacao() {
  console.log('📚 Gerando documentação da API...');
  
  const docsPath = path.join(__dirname, '../docs');
  
  // Criar diretório docs se não existir
  if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath);
  }
  
  const documentacao = {
    titulo: 'Fake API SEPLAG - Documentação',
    descricao: 'Documentação completa dos endpoints da API fake para estudos de concurso SEPLAG',
    versao: '1.0.0',
    baseUrl: 'http://localhost:3001/v1',
    endpoints: [
      {
        metodo: 'GET',
        caminho: '/pessoas/aberto/filtro',
        descricao: 'Lista pessoas com filtros avançados e paginação',
        parametros: [
          { nome: 'nome', tipo: 'string', obrigatorio: false, descricao: 'Busca por nome' },
          { nome: 'faixaIdadeInicial', tipo: 'number', obrigatorio: false, descricao: 'Idade mínima' },
          { nome: 'faixaIdadeFinal', tipo: 'number', obrigatorio: false, descricao: 'Idade máxima' },
          { nome: 'sexo', tipo: 'string', obrigatorio: false, descricao: 'MASCULINO ou FEMININO' },
          { nome: 'status', tipo: 'string', obrigatorio: false, descricao: 'ENCONTRADO ou DESAPARECIDO' },
          { nome: 'pagina', tipo: 'number', obrigatorio: false, descricao: 'Página (padrão: 0)' },
          { nome: 'porPagina', tipo: 'number', obrigatorio: false, descricao: 'Itens por página (padrão: 10)' }
        ],
        exemplo: {
          url: '/pessoas/aberto/filtro?sexo=FEMININO&faixaIdadeInicial=18&faixaIdadeFinal=30&pagina=0&porPagina=5',
          resposta: {
            content: 'Array de pessoas',
            totalPages: 'Número total de páginas',
            totalElements: 'Total de elementos',
            size: 'Tamanho da página',
            number: 'Número da página atual'
          }
        }
      },
      {
        metodo: 'GET',
        caminho: '/pessoas/aberto/dinamico',
        descricao: 'Retorna pessoas aleatórias para exibição dinâmica',
        parametros: [
          { nome: 'registros', tipo: 'number', obrigatorio: false, descricao: 'Quantidade de registros (padrão: 5)' }
        ],
        exemplo: {
          url: '/pessoas/aberto/dinamico?registros=3',
          resposta: 'Array de pessoas aleatórias'
        }
      },
      {
        metodo: 'GET',
        caminho: '/pessoas/aberto/estatistico',
        descricao: 'Estatísticas gerais do sistema',
        parametros: [],
        exemplo: {
          url: '/pessoas/aberto/estatistico',
          resposta: {
            quantPessoasDesaparecidas: 'Número de pessoas desaparecidas',
            quantPessoasEncontradas: 'Número de pessoas encontradas',
            totalRegistros: 'Total de registros',
            percentualEncontrados: 'Percentual de pessoas encontradas'
          }
        }
      },
      {
        metodo: 'GET',
        caminho: '/pessoas/:id',
        descricao: 'Detalhes completos de uma pessoa específica',
        parametros: [
          { nome: 'id', tipo: 'number', obrigatorio: true, descricao: 'ID da pessoa' }
        ],
        exemplo: {
          url: '/pessoas/1',
          resposta: 'Objeto com detalhes completos da pessoa'
        }
      },
      {
        metodo: 'POST',
        caminho: '/ocorrencias/informacoes-desaparecido',
        descricao: 'Envia informações sobre um desaparecido',
        parametros: [
          { nome: 'ocoId', tipo: 'string|number', obrigatorio: true, descricao: 'ID da ocorrência' },
          { nome: 'informacao', tipo: 'string', obrigatorio: true, descricao: 'Informação sobre o desaparecido' },
          { nome: 'descricao', tipo: 'string', obrigatorio: true, descricao: 'Descrição detalhada' },
          { nome: 'data', tipo: 'string', obrigatorio: true, descricao: 'Data da informação (YYYY-MM-DD)' },
          { nome: 'files', tipo: 'File[]', obrigatorio: false, descricao: 'Arquivos anexados (máx: 5)' }
        ],
        exemplo: {
          url: '/ocorrencias/informacoes-desaparecido',
          metodo: 'POST',
          contentType: 'multipart/form-data',
          body: {
            ocoId: '1001',
            informacao: 'Vi a pessoa no shopping',
            descricao: 'Ela estava vestindo uma camisa azul',
            data: '2024-03-25',
            files: '[arquivo1.jpg, arquivo2.pdf]'
          }
        }
      }
    ],
    modelos: {
      pessoa: {
        id: 'number',
        nome: 'string',
        idade: 'number',
        sexo: 'MASCULINO|FEMININO',
        urlFoto: 'string (URL)',
        ultimaOcorrencia: {
          ocoId: 'number',
          dtDesaparecimento: 'string (ISO date)',
          dataLocalizacao: 'string (ISO date) | undefined',
          localDesaparecimentoConcat: 'string',
          encontradoVivo: 'boolean',
          ocorrenciaEntrevDesapDTO: {
            vestimentasDesaparecido: 'string',
            informacao: 'string'
          },
          listaCartaz: [
            {
              tipoCartaz: 'string',
              urlCartaz: 'string (URL)'
            }
          ]
        },
        vivo: 'boolean'
      },
      respostaPaginada: {
        content: 'Array',
        totalPages: 'number',
        totalElements: 'number',
        size: 'number',
        number: 'number'
      },
      estatisticas: {
        quantPessoasDesaparecidas: 'number',
        quantPessoasEncontradas: 'number',
        totalRegistros: 'number',
        percentualEncontrados: 'number'
      }
    },
    codigosResposta: {
      200: 'Sucesso',
      400: 'Parâmetros inválidos',
      404: 'Recurso não encontrado',
      500: 'Erro interno do servidor'
    }
  };
  
  // Gerar arquivo JSON
  const jsonPath = path.join(docsPath, 'api-docs.json');
  fs.writeFileSync(jsonPath, JSON.stringify(documentacao, null, 2), 'utf8');
  
  // Gerar arquivo Markdown
  const markdownPath = path.join(docsPath, 'API.md');
  const markdown = gerarMarkdown(documentacao);
  fs.writeFileSync(markdownPath, markdown, 'utf8');
  
  // Gerar arquivo HTML simples
  const htmlPath = path.join(docsPath, 'index.html');
  const html = gerarHTML(documentacao);
  fs.writeFileSync(htmlPath, html, 'utf8');
  
  console.log('✅ Documentação gerada com sucesso!');
  console.log(`📄 JSON: ${jsonPath}`);
  console.log(`📝 Markdown: ${markdownPath}`);
  console.log(`🌐 HTML: ${htmlPath}`);
}

function gerarMarkdown(docs) {
  let markdown = `# ${docs.titulo}\n\n`;
  markdown += `${docs.descricao}\n\n`;
  markdown += `**Versão:** ${docs.versao}\n`;
  markdown += `**Base URL:** ${docs.baseUrl}\n\n`;
  
  markdown += '## Endpoints\n\n';
  
  docs.endpoints.forEach(endpoint => {
    markdown += `### ${endpoint.metodo} ${endpoint.caminho}\n\n`;
    markdown += `${endpoint.descricao}\n\n`;
    
    if (endpoint.parametros.length > 0) {
      markdown += '**Parâmetros:**\n\n';
      markdown += '| Nome | Tipo | Obrigatório | Descrição |\n';
      markdown += '|------|------|-------------|-----------|\n';
      
      endpoint.parametros.forEach(param => {
        const obrigatorio = param.obrigatorio ? 'Sim' : 'Não';
        markdown += `| ${param.nome} | ${param.tipo} | ${obrigatorio} | ${param.descricao} |\n`;
      });
      markdown += '\n';
    }
    
    if (endpoint.exemplo) {
      markdown += '**Exemplo:**\n\n';
      markdown += `\`\`\`bash\n`;
      markdown += `${endpoint.metodo} ${docs.baseUrl}${endpoint.exemplo.url}\n`;
      markdown += `\`\`\`\n\n`;
      
      if (endpoint.exemplo.resposta) {
        markdown += '**Resposta:**\n\n';
        markdown += `\`\`\`json\n`;
        markdown += JSON.stringify(endpoint.exemplo.resposta, null, 2);
        markdown += `\n\`\`\`\n\n`;
      }
    }
  });
  
  markdown += '## Modelos de Dados\n\n';
  
  Object.entries(docs.modelos).forEach(([nome, modelo]) => {
    markdown += `### ${nome}\n\n`;
    markdown += `\`\`\`json\n`;
    markdown += JSON.stringify(modelo, null, 2);
    markdown += `\n\`\`\`\n\n`;
  });
  
  markdown += '## Códigos de Resposta\n\n';
  markdown += '| Código | Descrição |\n';
  markdown += '|--------|-----------|\n';
  
  Object.entries(docs.codigosResposta).forEach(([codigo, descricao]) => {
    markdown += `| ${codigo} | ${descricao} |\n`;
  });
  
  return markdown;
}

function gerarHTML(docs) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${docs.titulo}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        .endpoint { border: 1px solid #ddd; margin: 20px 0; padding: 20px; border-radius: 5px; }
        .method { display: inline-block; padding: 5px 10px; border-radius: 3px; color: white; font-weight: bold; }
        .get { background-color: #61affe; }
        .post { background-color: #49cc90; }
        .put { background-color: #fca130; }
        .delete { background-color: #f93e3e; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        pre { background-color: #f5f5f5; padding: 10px; border-radius: 3px; overflow-x: auto; }
        .model { background-color: #f9f9f9; padding: 15px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>${docs.titulo}</h1>
    <p>${docs.descricao}</p>
    <p><strong>Versão:</strong> ${docs.versao}</p>
    <p><strong>Base URL:</strong> <code>${docs.baseUrl}</code></p>
    
    <h2>Endpoints</h2>
    ${docs.endpoints.map(endpoint => `
        <div class="endpoint">
            <h3><span class="method ${endpoint.metodo.toLowerCase()}">${endpoint.metodo}</span> ${endpoint.caminho}</h3>
            <p>${endpoint.descricao}</p>
            ${endpoint.parametros.length > 0 ? `
                <h4>Parâmetros:</h4>
                <table>
                    <tr><th>Nome</th><th>Tipo</th><th>Obrigatório</th><th>Descrição</th></tr>
                    ${endpoint.parametros.map(param => `
                        <tr><td>${param.nome}</td><td>${param.tipo}</td><td>${param.obrigatorio ? 'Sim' : 'Não'}</td><td>${param.descricao}</td></tr>
                    `).join('')}
                </table>
            ` : ''}
            ${endpoint.exemplo ? `
                <h4>Exemplo:</h4>
                <pre>${endpoint.metodo} ${docs.baseUrl}${endpoint.exemplo.url}</pre>
                ${endpoint.exemplo.resposta ? `
                    <h4>Resposta:</h4>
                    <pre>${JSON.stringify(endpoint.exemplo.resposta, null, 2)}</pre>
                ` : ''}
            ` : ''}
        </div>
    `).join('')}
    
    <h2>Modelos de Dados</h2>
    ${Object.entries(docs.modelos).map(([nome, modelo]) => `
        <div class="model">
            <h3>${nome}</h3>
            <pre>${JSON.stringify(modelo, null, 2)}</pre>
        </div>
    `).join('')}
    
    <h2>Códigos de Resposta</h2>
    <table>
        <tr><th>Código</th><th>Descrição</th></tr>
        ${Object.entries(docs.codigosResposta).map(([codigo, descricao]) => `
            <tr><td>${codigo}</td><td>${descricao}</td></tr>
        `).join('')}
    </table>
</body>
</html>`;
}

// Executar se chamado diretamente
if (require.main === module) {
  gerarDocumentacao();
}

module.exports = gerarDocumentacao;
