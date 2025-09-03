const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Configurar faker para português brasileiro
faker.locale = 'pt_BR';

// Dados específicos de Mato Grosso (expandidos)
const cidadesMT = [
  'Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra',
  'Cáceres', 'Sorriso', 'Lucas do Rio Verde', 'Primavera do Leste', 'Barra do Garças',
  'Alta Floresta', 'Juína', 'Nova Mutum', 'Campo Verde', 'Poxoréu',
  'Diamantino', 'Nobres', 'Arenápolis', 'Santo Antônio do Leverger', 'Chapada dos Guimarães',
  'Poconé', 'Nossa Senhora do Livramento', 'Rosário Oeste', 'Acorizal', 'Jangada',
  'Santo Antônio do Rio Abaixo', 'Itiquira', 'Pedra Preta', 'Nova Brasilândia', 'Araguaiana',
  'General Carneiro', 'Ponte Branca', 'Torixoréu', 'Ribeirãozinho', 'Tesouro',
  'Nova Xavantina', 'Canarana', 'Querência', 'São Félix do Araguaia', 'Confresa',
  'Santa Terezinha', 'Porto Alegre do Norte', 'São José do Xingu', 'Vila Rica', 'Nova Ubiratã',
  'Feliz Natal', 'Vera', 'Santa Cruz do Xingu', 'Paranatinga', 'Nova Canaã do Norte',
  'Tabaporã', 'Nova Bandeirantes', 'Peixoto de Azevedo', 'Matupá', 'Guarantã do Norte'
];

const bairrosCuiaba = [
  'Centro', 'Porto', 'Coxipó', 'Jardim das Américas', 'Jardim Europa',
  'Jardim Universitário', 'Bandeirantes', 'Santa Rosa', 'Boa Esperança',
  'Dom Aquino', 'Jardim Itália', 'Jardim Tropical', 'Jardim Presidente',
  'Jardim das Palmeiras', 'Jardim dos Ipês', 'Jardim das Flores',
  'Jardim das Acácias', 'Jardim das Magnólias', 'Jardim das Orquídeas',
  'Jardim das Violetas', 'Jardim das Margaridas', 'Jardim das Rosas',
  'Jardim das Tulipas', 'Jardim das Begônias', 'Jardim das Azaléias',
  'Jardim das Camélias', 'Jardim das Hortênsias', 'Jardim das Gardênias',
  'Jardim das Petúnias', 'Jardim das Crisântemos', 'Jardim das Dálias',
  'Jardim das Lírios', 'Jardim das Bromélias', 'Jardim das Samambaias',
  'Jardim das Palmas', 'Jardim das Palmeiras', 'Jardim das Acácias',
  'Jardim das Magnólias', 'Jardim das Orquídeas', 'Jardim das Violetas'
];

const bairrosVarzeaGrande = [
  'Centro', 'Jardim Glória', 'Jardim Marajoara', 'Jardim Imperial',
  'Jardim das Palmeiras', 'Jardim das Flores', 'Jardim das Acácias',
  'Jardim das Magnólias', 'Jardim das Orquídeas', 'Jardim das Violetas',
  'Jardim das Margaridas', 'Jardim das Rosas', 'Jardim das Tulipas',
  'Jardim das Begônias', 'Jardim das Azaléias', 'Jardim das Camélias',
  'Jardim das Hortênsias', 'Jardim das Gardênias', 'Jardim das Petúnias',
  'Jardim das Crisântemos', 'Jardim das Dálias', 'Jardim das Lírios',
  'Jardim das Bromélias', 'Jardim das Samambaias', 'Jardim das Palmas',
  'Jardim das Palmeiras', 'Jardim das Acácias', 'Jardim das Magnólias',
  'Jardim das Orquídeas', 'Jardim das Violetas', 'Jardim das Margaridas'
];

const vestimentasMasculinas = [
  'Camisa azul, calça jeans, tênis branco',
  'Camiseta branca, shorts azul, chinelo',
  'Terno cinza, camisa branca, sapato preto',
  'Camisa polo azul, calça khaki, sandália',
  'Camisa social branca, calça preta, sapato marrom',
  'Jaqueta jeans, camiseta preta, calça jeans, tênis',
  'Blazer azul, camisa listrada, calça social, sapato',
  'Moletom cinza, calça de moletom, tênis esportivo',
  'Camisa xadrez, calça jeans, botas',
  'Camisa polo verde, calça cargo, sandália esportiva',
  'Camisa listrada, calça jeans, tênis casual',
  'Blazer preto, camisa branca, calça social, sapato social',
  'Camisa polo vermelha, calça khaki, sandália',
  'Jaqueta de couro, camiseta branca, calça jeans, botas',
  'Camisa social azul, calça preta, sapato preto',
  'Moletom azul, calça de moletom, tênis',
  'Camisa xadrez vermelha, calça jeans, tênis',
  'Blazer marrom, camisa bege, calça social, sapato marrom',
  'Camisa polo amarela, calça cargo, sandália',
  'Jaqueta jeans, camiseta cinza, calça jeans, tênis'
];

const vestimentasFemininas = [
  'Vestido floral, sandália marrom',
  'Blusa rosa, saia preta, salto alto',
  'Blusa verde, calça jeans, tênis rosa',
  'Vestido preto, salto alto vermelho',
  'Blusa branca, calça jeans azul, tênis branco',
  'Vestido azul, sandália branca',
  'Blusa amarela, saia plissada, salto baixo',
  'Camiseta estampada, calça legging, tênis colorido',
  'Blusa de renda, calça jeans, salto alto',
  'Vestido longo, sandália dourada',
  'Blusa listrada, calça jeans, tênis branco',
  'Vestido vermelho, salto alto preto',
  'Blusa azul, saia plissada, sandália',
  'Camiseta branca, calça jeans, tênis rosa',
  'Vestido verde, sandália branca',
  'Blusa amarela, calça jeans, tênis',
  'Vestido rosa, salto alto dourado',
  'Blusa de seda, calça social, sapato social',
  'Camiseta estampada, saia jeans, tênis',
  'Vestido branco, sandália prateada'
];

const informacoesDesaparecimento = [
  'Última vez visto no centro da cidade',
  'Saiu de casa para ir à escola e não retornou',
  'Última vez vista no terminal de ônibus',
  'Saiu do trabalho e não retornou para casa',
  'Última vez vista na faculdade',
  'Saiu para uma festa e não retornou',
  'Última vez visto no shopping',
  'Última vez vista na universidade',
  'Saiu para comprar pão e não retornou',
  'Última vez visto na praça central',
  'Saiu para visitar amigos e não retornou',
  'Última vez vista no mercado',
  'Saiu para ir ao médico e não retornou',
  'Última vez visto na rodoviária',
  'Saiu para fazer exercícios e não retornou',
  'Última vez vista na igreja',
  'Saiu para ir ao banco e não retornou',
  'Última vez visto no parque',
  'Saiu para ir à farmácia e não retornou',
  'Última vez vista no cinema',
  'Saiu para ir ao supermercado e não retornou',
  'Última vez visto na academia',
  'Saiu para ir ao dentista e não retornou',
  'Última vez vista no salão de beleza',
  'Saiu para ir ao posto de gasolina e não retornou',
  'Última vez visto na padaria',
  'Saiu para ir ao açougue e não retornou',
  'Última vez vista na feira',
  'Saiu para ir ao pet shop e não retornou',
  'Última vez visto na loja de roupas',
  'Saiu para ir à biblioteca e não retornou',
  'Última vez vista no museu',
  'Saiu para ir ao teatro e não retornou'
];

function gerarPessoa(id) {
  const sexo = faker.helpers.arrayElement(['MASCULINO', 'FEMININO']);
  const idade = faker.number.int({ min: 12, max: 80 });
  const nome = faker.person.fullName({ sex: sexo === 'MASCULINO' ? 'male' : 'female' });
  
  const cidade = faker.helpers.arrayElement(cidadesMT);
  const bairros = cidade === 'Cuiabá' ? bairrosCuiaba : 
                  cidade === 'Várzea Grande' ? bairrosVarzeaGrande : 
                  [faker.location.street()];
  const bairro = faker.helpers.arrayElement(bairros);
  
  const dataDesaparecimento = faker.date.between({
    from: '2020-01-01',
    to: '2024-12-31'
  });
  
  const encontradoVivo = faker.datatype.boolean({ probability: 0.25 }); // 25% de chance de ser encontrado
  const dataLocalizacao = encontradoVivo ? 
    faker.date.between({
      from: dataDesaparecimento,
      to: '2024-12-31'
    }) : null;
  
  const vestimentas = sexo === 'MASCULINO' ? 
    faker.helpers.arrayElement(vestimentasMasculinas) :
    faker.helpers.arrayElement(vestimentasFemininas);
  
  const informacao = faker.helpers.arrayElement(informacoesDesaparecimento);
  
  // Gerar URLs de imagens realistas do LoremFlickr
  const urlFoto = faker.image.urlLoremFlickr({
    category: 'people',
    width: 300,
    height: 400
  });
  
  const urlCartaz = faker.image.urlLoremFlickr({
    category: 'people',
    width: 400,
    height: 600
  });

  return {
    id: id,
    nome: nome,
    idade: idade,
    sexo: sexo,
    urlFoto: urlFoto,
    ultimaOcorrencia: {
      ocoId: 1000 + id,
      dtDesaparecimento: dataDesaparecimento.toISOString(),
      dataLocalizacao: dataLocalizacao ? dataLocalizacao.toISOString() : undefined,
      localDesaparecimentoConcat: `${bairro}, ${cidade} - MT`,
      encontradoVivo: encontradoVivo,
      ocorrenciaEntrevDesapDTO: {
        vestimentasDesaparecido: vestimentas,
        informacao: informacao
      },
      listaCartaz: [
        {
          tipoCartaz: "PRINCIPAL",
          urlCartaz: urlCartaz
        }
      ]
    },
    vivo: true
  };
}

function gerarEstatisticas(pessoas) {
  const desaparecidas = pessoas.length;
  const encontradas = pessoas.filter(p => p.ultimaOcorrencia.encontradoVivo).length;
  
  return {
    quantPessoasDesaparecidas: desaparecidas,
    quantPessoasEncontradas: encontradas
  };
}

function gerarDados(quantidade = 500) {
  console.log(`🎲 Gerando ${quantidade} pessoas realistas com Faker.js...`);
  
  // Gerar pessoas
  const pessoas = [];
  for (let i = 1; i <= quantidade; i++) {
    pessoas.push(gerarPessoa(i));
    
    // Mostrar progresso a cada 100 pessoas
    if (i % 100 === 0) {
      console.log(`   ✅ ${i} pessoas geradas...`);
    }
  }
  
  // Gerar estatísticas baseadas nos dados
  const estatisticas = gerarEstatisticas(pessoas);
  
  // Salvar dados de pessoas
  const pessoasPath = path.join(__dirname, '../data/pessoas.js');
  const pessoasContent = `const pessoas = ${JSON.stringify(pessoas, null, 2)};\n\nmodule.exports = pessoas;`;
  
  fs.writeFileSync(pessoasPath, pessoasContent, 'utf8');
  console.log(`✅ ${pessoas.length} pessoas geradas e salvas em ${pessoasPath}`);
  
  // Salvar estatísticas
  const estatisticasPath = path.join(__dirname, '../data/estatisticas.js');
  const estatisticasContent = `const estatisticas = ${JSON.stringify(estatisticas, null, 2)};\n\nmodule.exports = estatisticas;`;
  
  fs.writeFileSync(estatisticasPath, estatisticasContent, 'utf8');
  console.log(`✅ Estatísticas geradas e salvas em ${estatisticasPath}`);
  
  // Gerar relatório detalhado
  const relatorio = {
    totalPessoas: pessoas.length,
    masculino: pessoas.filter(p => p.sexo === 'MASCULINO').length,
    feminino: pessoas.filter(p => p.sexo === 'FEMININO').length,
    encontradas: pessoas.filter(p => p.ultimaOcorrencia.encontradoVivo).length,
    naoEncontradas: pessoas.filter(p => !p.ultimaOcorrencia.encontradoVivo).length,
    cidades: [...new Set(pessoas.map(p => p.ultimaOcorrencia.localDesaparecimentoConcat.split(', ')[1]))],
    faixaEtaria: {
      '12-18': pessoas.filter(p => p.idade >= 12 && p.idade <= 18).length,
      '19-30': pessoas.filter(p => p.idade >= 19 && p.idade <= 30).length,
      '31-50': pessoas.filter(p => p.idade >= 31 && p.idade <= 50).length,
      '51+': pessoas.filter(p => p.idade >= 51).length
    },
    distribuicaoCidades: {}
  };
  
  // Calcular distribuição por cidade
  pessoas.forEach(p => {
    const cidade = p.ultimaOcorrencia.localDesaparecimentoConcat.split(', ')[1];
    relatorio.distribuicaoCidades[cidade] = (relatorio.distribuicaoCidades[cidade] || 0) + 1;
  });
  
  console.log('\n📊 Relatório detalhado dos dados gerados:');
  console.log(`   Total de pessoas: ${relatorio.totalPessoas}`);
  console.log(`   Masculino: ${relatorio.masculino} (${((relatorio.masculino/relatorio.totalPessoas)*100).toFixed(1)}%)`);
  console.log(`   Feminino: ${relatorio.feminino} (${((relatorio.feminino/relatorio.totalPessoas)*100).toFixed(1)}%)`);
  console.log(`   Encontradas: ${relatorio.encontradas} (${((relatorio.encontradas/relatorio.totalPessoas)*100).toFixed(1)}%)`);
  console.log(`   Não encontradas: ${relatorio.naoEncontradas} (${((relatorio.naoEncontradas/relatorio.totalPessoas)*100).toFixed(1)}%)`);
  
  console.log('\n   Faixa etária:');
  Object.entries(relatorio.faixaEtaria).forEach(([faixa, quantidade]) => {
    console.log(`     ${faixa}: ${quantidade} pessoas (${((quantidade/relatorio.totalPessoas)*100).toFixed(1)}%)`);
  });
  
  console.log('\n   Top 10 cidades:');
  const topCidades = Object.entries(relatorio.distribuicaoCidades)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
  
  topCidades.forEach(([cidade, quantidade], index) => {
    console.log(`     ${index + 1}. ${cidade}: ${quantidade} pessoas`);
  });
  
  console.log('\n🎉 Dataset grande gerado com sucesso!');
  console.log('💡 Execute "npm run dev" para iniciar a API com os novos dados.');
  console.log('📈 Agora você tem uma base de dados robusta para testes e desenvolvimento!');
}

// Executar se chamado diretamente
if (require.main === module) {
  const quantidade = process.argv[2] ? parseInt(process.argv[2]) : 500;
  gerarDados(quantidade);
}

module.exports = { gerarDados, gerarPessoa, gerarEstatisticas };
