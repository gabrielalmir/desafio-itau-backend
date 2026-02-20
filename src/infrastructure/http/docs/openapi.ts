export const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Desafio Itau Backend API",
    version: "1.0.0",
    description: "API para gerenciamento de transacoes e estatisticas."
  },
  servers: [{ url: "/" }],
  tags: [
    { name: "Transacoes" },
    { name: "Estatistica" },
    { name: "Health" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "API Secret"
      }
    },
    schemas: {
      TransactionRequest: {
        type: "object",
        required: ["valor", "dataHora"],
        properties: {
          valor: {
            type: "number",
            format: "double",
            example: 100
          },
          dataHora: {
            type: "string",
            format: "date-time",
            example: "2026-02-20T01:00:00.000Z"
          }
        }
      },
      StatisticsResponse: {
        type: "object",
        required: ["count", "sum", "avg", "min", "max"],
        properties: {
          count: { type: "integer", example: 3 },
          sum: { type: "number", format: "double", example: 300 },
          avg: { type: "number", format: "double", example: 100 },
          min: { type: "number", format: "double", example: 50 },
          max: { type: "number", format: "double", example: 150 }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "erro interno"
          }
        }
      }
    }
  },
  paths: {
    "/transacao": {
      post: {
        tags: ["Transacoes"],
        summary: "Cria uma nova transacao",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TransactionRequest" }
            }
          }
        },
        responses: {
          "201": { description: "Transacao criada com sucesso" },
          "400": { description: "Payload invalido" },
          "401": {
            description: "Nao autorizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          "422": {
            description: "Dados da transacao invalidos",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Transacoes"],
        summary: "Remove todas as transacoes",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Transacoes removidas" },
          "401": {
            description: "Nao autorizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/estatistica": {
      get: {
        tags: ["Estatistica"],
        summary: "Retorna estatisticas das transacoes",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "intervaloBusca",
            required: false,
            schema: {
              type: "integer",
              minimum: 0,
              default: 60
            },
            description: "Intervalo em segundos"
          }
        ],
        responses: {
          "200": {
            description: "Estatisticas calculadas",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/StatisticsResponse" }
              }
            }
          },
          "400": {
            description: "Intervalo invalido",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          "401": {
            description: "Nao autorizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check da API",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "API ativa",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" }
                  }
                }
              }
            }
          },
          "401": {
            description: "Nao autorizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    }
  }
} as const;

export const scalarHtml = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>API Docs - Scalar</title>
    <style>
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <script id="api-reference" data-url="/openapi.json"></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>`;
