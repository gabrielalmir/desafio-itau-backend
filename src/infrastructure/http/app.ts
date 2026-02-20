import { CreateTransactionUseCase } from "../../application/use-cases/create-transaction-use-case";
import { DeleteTransactionsUseCase } from "../../application/use-cases/delete-transactions-use-case";
import {
  GetStatisticsUseCase,
  InvalidIntervalError
} from "../../application/use-cases/get-statistics-use-case";
import {
  TransactionValidationError,
  TransactionValidationService
} from "../../domain/services/transaction-validation-service";
import { getConfig } from "../../config/env";
import { PrismaTransactionRepository } from "../database/prisma/repositories/prisma-transaction-repository";
import { ensureBearerToken, UnauthorizedError } from "./middlewares/auth-middleware";

const config = getConfig();
const repository = new PrismaTransactionRepository();
const validationService = new TransactionValidationService();

const createTransactionUseCase = new CreateTransactionUseCase(repository, validationService);
const deleteTransactionsUseCase = new DeleteTransactionsUseCase(repository);
const getStatisticsUseCase = new GetStatisticsUseCase(repository);

function response(status: number, data?: unknown): Response {
  if (data === undefined) {
    return new Response(null, { status });
  }

  return Response.json(data, { status });
}

async function parseJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

export async function app(request: Request): Promise<Response> {
  try {
    ensureBearerToken(request.headers.get("authorization"), config.apiSecret);

    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/transacao") {
      const body = await parseJson<{ valor: number; dataHora: string }>(request);

      if (!body) {
        return response(400);
      }

      await createTransactionUseCase.execute(body);
      return response(201);
    }

    if (request.method === "DELETE" && url.pathname === "/transacao") {
      await deleteTransactionsUseCase.execute();
      return response(200);
    }

    if (request.method === "GET" && url.pathname === "/estatistica") {
      const intervaloBusca = url.searchParams.get("intervaloBusca") ?? undefined;
      const stats = await getStatisticsUseCase.execute(intervaloBusca);
      return response(200, stats);
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return response(200, { status: "ok" });
    }

    return response(404, { message: "rota não encontrada" });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return response(401, { message: error.message });
    }

    if (error instanceof TransactionValidationError) {
      return response(422, { message: error.message });
    }

    if (error instanceof InvalidIntervalError) {
      return response(400, { message: error.message });
    }

    return response(500, { message: "erro interno" });
  }
}
