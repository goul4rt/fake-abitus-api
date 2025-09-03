const fs = require('fs');
const path = require('path');

function validarDados() {
  console.log('🔍 Validando estrutura dos dados...');
  
  const pessoasPath = path.join(__dirname, '../data/pessoas.js');
  const estatisticasPath = path.join(__dirname, '../data/estatisticas.js');
  
  let erros = [];
  let avisos = [];
  
  // Validar arquivo de pessoas
  if (!fs.existsSync(pessoasPath)) {
    erros.push('Arquivo pessoas.js não encontrado');
  } else {
    try {
      const pessoas = require(pessoasPath);
      
      if (!Array.isArray(pessoas)) {
        erros.push('Dados de pessoas devem ser um array');
      } else {
        console.log(`✅ ${pessoas.length} pessoas encontradas`);
        
        // Validar estrutura de cada pessoa
        pessoas.forEach((pessoa, index) => {
          const camposObrigatorios = ['id', 'nome', 'idade', 'sexo', 'urlFoto', 'ultimaOcorrencia'];
          
          camposObrigatorios.forEach(campo => {
            if (!(campo in pessoa)) {
              erros.push(`Pessoa ${index + 1}: campo obrigatório '${campo}' ausente`);
            }
          });
          
          // Validar tipos
          if (typeof pessoa.id !== 'number') {
            erros.push(`Pessoa ${index + 1}: 'id' deve ser número`);
          }
          
          if (typeof pessoa.nome !== 'string' || pessoa.nome.length === 0) {
            erros.push(`Pessoa ${index + 1}: 'nome' deve ser string não vazia`);
          }
          
          if (typeof pessoa.idade !== 'number' || pessoa.idade < 0 || pessoa.idade > 120) {
            erros.push(`Pessoa ${index + 1}: 'idade' deve ser número entre 0-120`);
          }
          
          if (!['MASCULINO', 'FEMININO'].includes(pessoa.sexo)) {
            erros.push(`Pessoa ${index + 1}: 'sexo' deve ser 'MASCULINO' ou 'FEMININO'`);
          }
          
          if (typeof pessoa.urlFoto !== 'string' || !pessoa.urlFoto.startsWith('http')) {
            erros.push(`Pessoa ${index + 1}: 'urlFoto' deve ser URL válida`);
          }
          
          // Validar ultimaOcorrencia
          if (typeof pessoa.ultimaOcorrencia !== 'object') {
            erros.push(`Pessoa ${index + 1}: 'ultimaOcorrencia' deve ser objeto`);
          } else {
            const camposOcorrencia = ['ocoId', 'dtDesaparecimento', 'localDesaparecimentoConcat', 'encontradoVivo'];
            
            camposOcorrencia.forEach(campo => {
              if (!(campo in pessoa.ultimaOcorrencia)) {
                erros.push(`Pessoa ${index + 1}: campo obrigatório 'ultimaOcorrencia.${campo}' ausente`);
              }
            });
          }
        });
        
        // Estatísticas dos dados
        const masculino = pessoas.filter(p => p.sexo === 'MASCULINO').length;
        const feminino = pessoas.filter(p => p.sexo === 'FEMININO').length;
        const encontradas = pessoas.filter(p => p.ultimaOcorrencia.encontradoVivo).length;
        
        console.log(`📊 Estatísticas dos dados:`);
        console.log(`   Masculino: ${masculino}`);
        console.log(`   Feminino: ${feminino}`);
        console.log(`   Encontradas: ${encontradas}`);
        console.log(`   Não encontradas: ${pessoas.length - encontradas}`);
      }
    } catch (error) {
      erros.push(`Erro ao carregar pessoas.js: ${error.message}`);
    }
  }
  
  // Validar arquivo de estatísticas
  if (!fs.existsSync(estatisticasPath)) {
    erros.push('Arquivo estatisticas.js não encontrado');
  } else {
    try {
      const estatisticas = require(estatisticasPath);
      
      const camposObrigatorios = ['quantPessoasDesaparecidas', 'quantPessoasEncontradas'];
      
      camposObrigatorios.forEach(campo => {
        if (!(campo in estatisticas)) {
          erros.push(`Campo obrigatório '${campo}' ausente em estatisticas`);
        }
      });
      
      if (typeof estatisticas.quantPessoasDesaparecidas !== 'number') {
        erros.push("'quantPessoasDesaparecidas' deve ser número");
      }
      
      if (typeof estatisticas.quantPessoasEncontradas !== 'number') {
        erros.push("'quantPessoasEncontradas' deve ser número");
      }
      
      console.log('✅ Estatísticas validadas');
    } catch (error) {
      erros.push(`Erro ao carregar estatisticas.js: ${error.message}`);
    }
  }
  
  // Relatório final
  console.log('\n📋 Relatório de Validação:');
  
  if (erros.length === 0 && avisos.length === 0) {
    console.log('✅ Todos os dados estão válidos!');
  } else {
    if (erros.length > 0) {
      console.log(`❌ ${erros.length} erro(s) encontrado(s):`);
      erros.forEach(erro => console.log(`   - ${erro}`));
    }
    
    if (avisos.length > 0) {
      console.log(`⚠️  ${avisos.length} aviso(s):`);
      avisos.forEach(aviso => console.log(`   - ${aviso}`));
    }
  }
  
  return {
    sucesso: erros.length === 0,
    erros,
    avisos
  };
}

// Executar se chamado diretamente
if (require.main === module) {
  validarDados();
}

module.exports = validarDados;
