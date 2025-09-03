const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Configurar faker para português brasileiro
faker.locale = 'pt_BR';

// Dados específicos de Mato Grosso
const cidadesMT = [
  'Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra',
  'Cáceres', 'Sorriso', 'Lucas do Rio Verde', 'Primavera do Leste', 'Barra do Garças',
  'Alta Floresta', 'Juína', 'Nova Mutum', 'Campo Verde', 'Poxoréu',
  'Diamantino', 'Nobres', 'Arenápolis', 'Santo Antônio do Leverger', 'Chapada dos Guimarães'
];

const bairrosCuiaba = [
  'Centro', 'Porto', 'Coxipó', 'Jardim das Américas', 'Jardim Europa',
  'Jardim Universitário', 'Bandeirantes', 'Santa Rosa', 'Boa Esperança',
  'Dom Aquino', 'Jardim Itália', 'Jardim Tropical', 'Jardim Presidente',
  'Jardim das Palmeiras', 'Jardim dos Ipês', 'Jardim das Flores',
  'Jardim das Acácias', 'Jardim das Magnólias', 'Jardim das Orquídeas',
  'Jardim das Violetas', 'Jardim das Margaridas', 'Jardim das Rosas'
];

const bairrosVarzeaGrande = [
  'Centro', 'Jardim Glória', 'Jardim Marajoara', 'Jardim Imperial',
  'Jardim das Palmeiras', 'Jardim das Flores', 'Jardim das Acácias',
  'Jardim das Magnólias', 'Jardim das Orquídeas', 'Jardim das Violetas',
  'Jardim das Margaridas', 'Jardim das Rosas', 'Jardim das Tulipas',
  'Jardim das Begônias', 'Jardim das Azaléias', 'Jardim das Camélias'
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
  'Camisa polo verde, calça cargo, sandália esportiva'
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
  'Vestido longo, sandália dourada'
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
  'Saiu para fazer exercícios e não retornou'
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
  
  const encontradoVivo = faker.datatype.boolean({ probability: 0.3 }); // 30% de chance de ser encontrado
  const dataLocalizacao = encontradoVivo ? 
    faker.date.between({
      from: dataDesaparecimento,
      to: '2024-12-31'
    }) : null;
  
  const vestimentas = sexo === 'MASCULINO' ? 
    faker.helpers.arrayElement(vestimentasMasculinas) :
    faker.helpers.arrayElement(vestimentasFemininas);
  
  const informacao = faker.helpers.arrayElement(informacoesDesaparecimento);
  
  // Gerar URLs de imagens realistas do Unsplash
  const genero = sexo === 'MASCULINO' ? 'men' : 'women';
  const idadeFoto = idade < 18 ? 'teenager' : idade < 30 ? 'young' : idade < 50 ? 'adult' : 'elderly';
  
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

function gerarDados() {
  console.log('🎲 Gerando dados realistas com Faker.js...');
  
  // Gerar 100 pessoas
  const pessoas = [];
  for (let i = 1; i <= 100; i++) {
    pessoas.push(gerarPessoa(i));
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
  
  // Gerar relatório
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
    }
  };
  
  console.log('\n📊 Relatório dos dados gerados:');
  console.log(`   Total de pessoas: ${relatorio.totalPessoas}`);
  console.log(`   Masculino: ${relatorio.masculino}`);
  console.log(`   Feminino: ${relatorio.feminino}`);
  console.log(`   Encontradas: ${relatorio.encontradas}`);
  console.log(`   Não encontradas: ${relatorio.naoEncontradas}`);
  console.log(`   Cidades: ${relatorio.cidades.join(', ')}`);
  console.log('\n   Faixa etária:');
  Object.entries(relatorio.faixaEtaria).forEach(([faixa, quantidade]) => {
    console.log(`     ${faixa}: ${quantidade} pessoas`);
  });
  
  console.log('\n🎉 Dados gerados com sucesso!');
  console.log('💡 Execute "npm run dev" para iniciar a API com os novos dados.');
}

// Executar se chamado diretamente
if (require.main === module) {
  gerarDados();
}

module.exports = { gerarDados, gerarPessoa, gerarEstatisticas };
