# 🎯 Fake API SEPLAG - Sistema de Desaparecidos

> **API Fake para Estudos de Concurso SEPLAG** - Simula o sistema ABITUS (Sistema de Desaparecidos) para desenvolvimento e testes técnicos

## 📋 Sobre o Projeto

Este projeto foi criado para auxiliar candidatos que estão se preparando para concursos do **SEPLAG** (Secretaria de Estado de Planejamento e Gestão) de Mato Grosso. Ele simula a API do sistema ABITUS, permitindo que você pratique desenvolvimento frontend sem depender da API oficial.

### 🎯 Objetivos de Estudo

- **Entender padrões de API REST** utilizados pelo governo
- **Praticar integração frontend-backend** com dados realistas
- **Simular cenários de teste** para concursos técnicos
- **Aprender sobre paginação, filtros e busca** em APIs
- **Desenvolver interfaces responsivas** para sistemas governamentais

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 16+ 
- npm 8+
- Git

### Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/fakeapi-seplag.git
cd fakeapi-seplag

# Instale as dependências
npm install

# Gere dados de teste
npm run generate-data

# Execute em modo desenvolvimento
npm run dev
```

A API estará disponível em: `http://localhost:3001`

## 📊 Endpoints da API

### 🔍 Pessoas Desaparecidas

#### `GET /v1/pessoas/aberto/filtro`
Lista pessoas com filtros avançados e paginação.

**Parâmetros de Query:**
```typescript
{
  nome?: string;              // Busca por nome
  faixaIdadeInicial?: number; // Idade mínima
  faixaIdadeFinal?: number;   // Idade máxima  
  sexo?: "MASCULINO" | "FEMININO";
  status?: "ENCONTRADO" | "DESAPARECIDO";
  pagina?: number;            // Página (padrão: 0)
  porPagina?: number;        // Itens por página (padrão: 10)
}
```

**Exemplo de Uso:**
```bash
# Buscar mulheres desaparecidas entre 18-30 anos
GET /v1/pessoas/aberto/filtro?sexo=FEMININO&faixaIdadeInicial=18&faixaIdadeFinal=30&pagina=0&porPagina=5

# Buscar por nome específico
GET /v1/pessoas/aberto/filtro?nome=Maria&pagina=0&porPagina=10
```

**Resposta:**
```json
{
  "content": [
    {
      "id": 1,
      "nome": "Maria Silva Santos",
      "idade": 25,
      "sexo": "FEMININO",
      "urlFoto": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop",
      "ultimaOcorrencia": {
        "ocoId": 1001,
        "dtDesaparecimento": "2024-03-15T10:30:00.000Z",
        "localDesaparecimentoConcat": "Centro, Cuiabá - MT",
        "encontradoVivo": false,
        "ocorrenciaEntrevDesapDTO": {
          "vestimentasDesaparecido": "Vestido azul, sandália branca",
          "informacao": "Última vez vista na universidade"
        }
      }
    }
  ],
  "totalPages": 5,
  "totalElements": 50,
  "size": 10,
  "number": 0
}
```

#### `GET /v1/pessoas/aberto/dinamico`
Retorna pessoas aleatórias para exibição dinâmica.

**Parâmetros:**
```typescript
{
  registros?: number; // Quantidade (padrão: 5)
}
```

#### `GET /v1/pessoas/aberto/estatistico`
Estatísticas gerais do sistema.

**Resposta:**
```json
{
  "quantPessoasDesaparecidas": 150,
  "quantPessoasEncontradas": 45,
  "totalRegistros": 195,
  "percentualEncontrados": 23.08
}
```

#### `GET /v1/pessoas/:id`
Detalhes completos de uma pessoa específica.

### 📝 Ocorrências

#### `POST /v1/ocorrencias/informacoes-desaparecido`
Envia informações sobre um desaparecido.

**Form Data:**
```typescript
{
  ocoId: string | number;     // ID da ocorrência
  informacao: string;         // Informação sobre o desaparecido
  descricao: string;          // Descrição detalhada
  data: string;               // Data da informação (YYYY-MM-DD)
  files?: File[];             // Arquivos anexados (máx: 5)
}
```

## 🛠️ Scripts Úteis

### Geração de Dados
```bash
# Dados básicos (100 pessoas)
npm run generate-data

# Datasets grandes
npm run generate-1000  # 1000 pessoas
npm run generate-2000  # 2000 pessoas  
npm run generate-5000  # 5000 pessoas

# Personalizado
node scripts/generate-large-dataset.js 1500
```

### Desenvolvimento
```bash
# Modo desenvolvimento (auto-reload)
npm run dev

# Testes
npm run test           # Executa testes uma vez
npm run test:watch     # Executa testes em modo watch

# Qualidade de código
npm run lint          # Verifica código
npm run lint:fix      # Corrige problemas automaticamente
npm run format        # Formata código
npm run check         # Executa lint + testes
```

### Manutenção
```bash
# Limpar dados gerados
npm run clean

# Validar estrutura dos dados
npm run validate

# Gerar documentação
npm run docs
```

## 🎨 Dados Mock Realistas

O sistema gera dados extremamente realistas usando **Faker.js**:

### 👥 Pessoas
- **Nomes brasileiros autênticos** (masculinos e femininos)
- **Idades realistas** (12-80 anos)
- **Fotos reais** do Unsplash (não placeholders)
- **Locais de Mato Grosso** (50+ cidades)
- **Bairros específicos** de Cuiabá e Várzea Grande

### 📍 Localização
- **Cidades de MT**: Cuiabá, Várzea Grande, Rondonópolis, Sinop, etc.
- **Bairros**: Centro, Coxipó, Jardim das Américas, etc.
- **Datas variadas** entre 2020-2024

### 👕 Vestimentas
- **Descrições detalhadas** e realistas
- **Diferentes por gênero** e idade
- **Informações de contexto** sobre desaparecimento

## 🔧 Configuração Avançada

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### CORS
Configurado para aceitar requisições de:
- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `http://localhost:3001`

## 📚 Exemplos de Uso para Estudos

### 1. Frontend React/Vue/Angular
```javascript
// Exemplo de integração
const API_BASE = 'http://localhost:3001/v1';

// Buscar pessoas com filtros
const buscarPessoas = async (filtros) => {
  const params = new URLSearchParams(filtros);
  const response = await fetch(`${API_BASE}/pessoas/aberto/filtro?${params}`);
  return response.json();
};

// Exibir estatísticas
const buscarEstatisticas = async () => {
  const response = await fetch(`${API_BASE}/pessoas/aberto/estatistico`);
  return response.json();
};
```

### 2. Testes Automatizados
```javascript
// Exemplo com Jest + Supertest
const request = require('supertest');
const app = require('../server');

describe('API Pessoas', () => {
  test('deve retornar lista paginada', async () => {
    const response = await request(app)
      .get('/v1/pessoas/aberto/filtro')
      .query({ pagina: 0, porPagina: 5 });
    
    expect(response.status).toBe(200);
    expect(response.body.content).toHaveLength(5);
  });
});
```

## 🎯 Dicas para Concursos

### Padrões Importantes
1. **Paginação**: Sempre implemente paginação em listas grandes
2. **Filtros**: Permita múltiplos filtros combinados
3. **Respostas padronizadas**: Use sempre o mesmo formato de resposta
4. **Tratamento de erros**: Implemente códigos HTTP corretos
5. **Documentação**: Mantenha endpoints bem documentados

### Tecnologias Recomendadas
- **Frontend**: React, Vue.js, Angular
- **Backend**: Node.js, Python, Java
- **Testes**: Jest, Cypress, Postman
- **Deploy**: Docker, Heroku, Vercel

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/fakeapi-seplag/issues)
- **Discord**: [Servidor da Comunidade](https://discord.gg/seplag-dev)
- **Email**: suporte@fakeapi-seplag.com

---

**Boa sorte no seu concurso! 🍀**

*Este projeto é mantido pela comunidade de desenvolvedores que estão se preparando para concursos do SEPLAG.*
