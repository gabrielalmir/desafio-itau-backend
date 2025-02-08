# Desafio Itaú Backend

Este projeto é uma API para gerenciamento de transações e estatísticas, desenvolvida em Go.

## Estrutura do Projeto

- `api/`: Contém as rotas da API.
- `config/`: Carrega as variáveis de ambiente.
- `controllers/`: Implementa os controladores das rotas.
- `dtos/`: Define os Data Transfer Objects (DTOs).
- `docs/`: Documentação gerada pelo Swagger.
- `services/`: Implementa a lógica de negócios.
- `main.go`: Ponto de entrada da aplicação.

## Pré-requisitos

- Go 1.23
- Docker
- Docker Compose

## Configuração

1. Clone o repositório:
    ```sh
    git clone https://github.com/gabrielalmir/desafio-itau-backend.git
    cd desafio-itau-backend
    ```

2. Crie um arquivo `.env` com as variáveis de ambiente necessárias.

## Executando a Aplicação

### Usando Docker

1. Construa e inicie os containers:
    ```sh
    docker-compose up --build
    ```

2. Acesse a aplicação em `http://localhost:8080`.

### Usando Go

1. Instale as dependências:
    ```sh
    go mod download
    ```

2. Execute a aplicação:
    ```sh
    go run main.go
    ```

## Endpoints

- `POST /transacao`: Cria uma nova transação.
- `DELETE /transacao`: Remove todas as transações.
- `GET /estatistica`: Retorna estatísticas das transações.

## Documentação da API

A documentação da API está disponível em `http://localhost:8080/swagger/index.html`.

## Testando a API

Você pode usar o arquivo `api.http` para testar os endpoints da API.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
