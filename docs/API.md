# Fake API SEPLAG - Documentação

Documentação completa dos endpoints da API fake para estudos de concurso SEPLAG

**Versão:** 1.0.0
**Base URL:** http://localhost:3001/v1

## Endpoints

### GET /pessoas/aberto/filtro

Lista pessoas com filtros avançados e paginação

**Parâmetros:**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| nome | string | Não | Busca por nome |
| faixaIdadeInicial | number | Não | Idade mínima |
| faixaIdadeFinal | number | Não | Idade máxima |
| sexo | string | Não | MASCULINO ou FEMININO |
| status | string | Não | ENCONTRADO ou DESAPARECIDO |
| pagina | number | Não | Página (padrão: 0) |
| porPagina | number | Não | Itens por página (padrão: 10) |

**Exemplo:**

```bash
GET http://localhost:3001/v1/pessoas/aberto/filtro?sexo=FEMININO&faixaIdadeInicial=18&faixaIdadeFinal=30&pagina=0&porPagina=5
```

**Resposta:**

```json
{
  "content": "Array de pessoas",
  "totalPages": "Número total de páginas",
  "totalElements": "Total de elementos",
  "size": "Tamanho da página",
  "number": "Número da página atual"
}
```

### GET /pessoas/aberto/dinamico

Retorna pessoas aleatórias para exibição dinâmica

**Parâmetros:**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| registros | number | Não | Quantidade de registros (padrão: 5) |

**Exemplo:**

```bash
GET http://localhost:3001/v1/pessoas/aberto/dinamico?registros=3
```

**Resposta:**

```json
"Array de pessoas aleatórias"
```

### GET /pessoas/aberto/estatistico

Estatísticas gerais do sistema

**Exemplo:**

```bash
GET http://localhost:3001/v1/pessoas/aberto/estatistico
```

**Resposta:**

```json
{
  "quantPessoasDesaparecidas": "Número de pessoas desaparecidas",
  "quantPessoasEncontradas": "Número de pessoas encontradas",
  "totalRegistros": "Total de registros",
  "percentualEncontrados": "Percentual de pessoas encontradas"
}
```

### GET /pessoas/:id

Detalhes completos de uma pessoa específica

**Parâmetros:**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| id | number | Sim | ID da pessoa |

**Exemplo:**

```bash
GET http://localhost:3001/v1/pessoas/1
```

**Resposta:**

```json
"Objeto com detalhes completos da pessoa"
```

### POST /ocorrencias/informacoes-desaparecido

Envia informações sobre um desaparecido

**Parâmetros:**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| ocoId | string|number | Sim | ID da ocorrência |
| informacao | string | Sim | Informação sobre o desaparecido |
| descricao | string | Sim | Descrição detalhada |
| data | string | Sim | Data da informação (YYYY-MM-DD) |
| files | File[] | Não | Arquivos anexados (máx: 5) |

**Exemplo:**

```bash
POST http://localhost:3001/v1/ocorrencias/informacoes-desaparecido
```

## Modelos de Dados

### pessoa

```json
{
  "id": "number",
  "nome": "string",
  "idade": "number",
  "sexo": "MASCULINO|FEMININO",
  "urlFoto": "string (URL)",
  "ultimaOcorrencia": {
    "ocoId": "number",
    "dtDesaparecimento": "string (ISO date)",
    "dataLocalizacao": "string (ISO date) | undefined",
    "localDesaparecimentoConcat": "string",
    "encontradoVivo": "boolean",
    "ocorrenciaEntrevDesapDTO": {
      "vestimentasDesaparecido": "string",
      "informacao": "string"
    },
    "listaCartaz": [
      {
        "tipoCartaz": "string",
        "urlCartaz": "string (URL)"
      }
    ]
  },
  "vivo": "boolean"
}
```

### respostaPaginada

```json
{
  "content": "Array",
  "totalPages": "number",
  "totalElements": "number",
  "size": "number",
  "number": "number"
}
```

### estatisticas

```json
{
  "quantPessoasDesaparecidas": "number",
  "quantPessoasEncontradas": "number",
  "totalRegistros": "number",
  "percentualEncontrados": "number"
}
```

## Códigos de Resposta

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 400 | Parâmetros inválidos |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |
