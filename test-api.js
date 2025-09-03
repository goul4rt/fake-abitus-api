const axios = require('axios');

const BASE_URL = 'http://localhost:3001/v1';

async function testAPI() {
  console.log('🧪 Testando Fake API...\n');

  try {
    // Teste 1: Health check
    console.log('1. Testando health check...');
    const health = await axios.get('http://localhost:3001/health');
    console.log('✅ Health check OK:', health.data.message);

    // Teste 2: Estatísticas
    console.log('\n2. Testando estatísticas...');
    const stats = await axios.get(`${BASE_URL}/pessoas/aberto/estatistico`);
    console.log('✅ Estatísticas:', stats.data);

    // Teste 3: Lista de pessoas
    console.log('\n3. Testando lista de pessoas...');
    const pessoas = await axios.get(`${BASE_URL}/pessoas/aberto/filtro?porPagina=3`);
    console.log('✅ Pessoas encontradas:', pessoas.data.totalElements);
    console.log('   Primeira pessoa:', pessoas.data.content[0]?.nome);

    // Teste 4: Pessoas aleatórias
    console.log('\n4. Testando pessoas aleatórias...');
    const random = await axios.get(`${BASE_URL}/pessoas/aberto/dinamico?registros=2`);
    console.log('✅ Pessoas aleatórias:', random.data.length);

    // Teste 5: Detalhes de uma pessoa
    console.log('\n5. Testando detalhes de pessoa...');
    const detalhes = await axios.get(`${BASE_URL}/pessoas/1`);
    console.log('✅ Detalhes da pessoa:', detalhes.data.nome);

    // Teste 6: Filtros
    console.log('\n6. Testando filtros...');
    const filtros = await axios.get(`${BASE_URL}/pessoas/aberto/filtro?sexo=MASCULINO&porPagina=2`);
    console.log('✅ Filtro por sexo masculino:', filtros.data.content.length, 'pessoas');

    console.log('\n🎉 Todos os testes passaram! A Fake API está funcionando corretamente.');
    console.log('\n📖 Documentação: http://localhost:3001');
    console.log('🔗 Endpoints disponíveis:');
    console.log('   - GET /v1/pessoas/aberto/filtro');
    console.log('   - GET /v1/pessoas/aberto/dinamico');
    console.log('   - GET /v1/pessoas/aberto/estatistico');
    console.log('   - GET /v1/pessoas/:id');
    console.log('   - POST /v1/ocorrencias/informacoes-desaparecido');

  } catch (error) {
    console.error('❌ Erro nos testes:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Dica: Certifique-se de que a Fake API está rodando:');
      console.log('   npm run dev');
    }
  }
}

// Executar testes se o arquivo for executado diretamente
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;
