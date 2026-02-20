# Desafio Itaú Backend (DDD + Bun + Prisma)

API de transações reescrita com foco em DDD, TypeScript/Bun.js, Prisma e SQLite.

## Arquitetura

A estrutura segue separação por camadas:

- `src/domain`: entidades, contratos de repositório e regras de domínio.
- `src/application`: casos de uso e DTOs.
- `src/infrastructure`: Prisma, HTTP, middlewares e detalhes de framework.
- `src/config`: leitura/validação de variáveis de ambiente.

## Stack

- Bun.js
- TypeScript
- Prisma ORM
- SQLite
- Docker
- Autenticação por Bearer Token (`API_SECRET`)
- HTTPS opcional por certificado/ chave PEM

## Endpoints

- `POST /transacao`
- `DELETE /transacao`
- `GET /estatistica?intervaloBusca=60`
- `GET /health`
- `GET /openapi.json` (documentacao OpenAPI)
- `GET /docs` (UI Scalar)

Todos exigem header:

```http
Authorization: Bearer <API_SECRET>
```

Excecao: `GET /openapi.json` e `GET /docs` nao exigem autenticacao.

## Variáveis de ambiente

Use `.env.example` como base:

```env
PORT=8080
HOST=0.0.0.0
DATABASE_URL="file:./prisma/dev.db"
API_SECRET="troque-este-secret"
HTTPS_ENABLED=false
HTTPS_CERT_PATH=""
HTTPS_KEY_PATH=""
```

## Executando localmente

1. Instale dependências:

```bash
bun install
```

2. Gere o client do Prisma:

```bash
bun run prisma:generate
```

3. Sincronize schema no SQLite:

```bash
bun run prisma:db:push
```

4. Inicie a API:

```bash
bun run dev
```

## Executando com Docker

```bash
docker compose up --build
```

A API sobe em `http://localhost:8080`.

## HTTPS opcional

Para habilitar HTTPS:

1. Defina `HTTPS_ENABLED=true`.
2. Informe caminhos de certificado/chave PEM:

```env
HTTPS_CERT_PATH="/caminho/cert.pem"
HTTPS_KEY_PATH="/caminho/key.pem"
```

Com isso, o servidor inicia em `https://...`.

## Testes

```bash
bun run test
```

## Exemplos de requisição

Use o arquivo `api.http` para testar os endpoints.
