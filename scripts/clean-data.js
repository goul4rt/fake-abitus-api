const fs = require('fs');
const path = require('path');

function limparDados() {
  console.log('🧹 Limpando dados gerados...');
  
  const arquivosParaLimpar = [
    '../data/pessoas.js',
    '../data/estatisticas.js'
  ];
  
  let arquivosRemovidos = 0;
  
  arquivosParaLimpar.forEach(arquivo => {
    const caminhoCompleto = path.join(__dirname, arquivo);
    
    if (fs.existsSync(caminhoCompleto)) {
      fs.unlinkSync(caminhoCompleto);
      console.log(`✅ Removido: ${arquivo}`);
      arquivosRemovidos++;
    } else {
      console.log(`ℹ️  Arquivo não encontrado: ${arquivo}`);
    }
  });
  
  if (arquivosRemovidos > 0) {
    console.log(`\n🎉 ${arquivosRemovidos} arquivo(s) removido(s) com sucesso!`);
    console.log('💡 Execute "npm run generate-data" para gerar novos dados.');
  } else {
    console.log('\nℹ️  Nenhum arquivo foi removido.');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  limparDados();
}

module.exports = limparDados;
