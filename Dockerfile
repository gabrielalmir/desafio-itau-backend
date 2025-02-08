# syntax=docker/dockerfile:1

# Etapa 1: Resolver dependências
FROM golang:1.23-alpine AS dependencies

WORKDIR /app

# Copia os arquivos do projeto
COPY go.mod go.sum ./
RUN go mod download

################################################################################

# Etapa 2: Construir o aplicativo
FROM dependencies AS build

WORKDIR /app

COPY . .

RUN go build -o app ./main.go

################################################################################

# Etapa 3: Ambiente de Produção
FROM alpine:latest AS production

WORKDIR /app

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

COPY --from=build /app/app .

EXPOSE 8080

ENTRYPOINT [ "/app/app" ]
