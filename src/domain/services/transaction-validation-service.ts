import type { TransactionRequestDTO } from "../../application/dtos/transaction-request-dto";

export class TransactionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TransactionValidationError";
  }
}

export type ValidTransactionInput = {
  amount: number;
  createdAt: Date;
};

export class TransactionValidationService {
  validate(input: TransactionRequestDTO): ValidTransactionInput {
    if (typeof input.valor !== "number" || Number.isNaN(input.valor) || !Number.isFinite(input.valor)) {
      throw new TransactionValidationError("valor inválido");
    }

    if (input.valor <= 0) {
      throw new TransactionValidationError("valor deve ser maior que zero");
    }

    if (typeof input.dataHora !== "string" || input.dataHora.length === 0) {
      throw new TransactionValidationError("dataHora inválida");
    }

    const createdAt = new Date(input.dataHora);

    if (Number.isNaN(createdAt.getTime())) {
      throw new TransactionValidationError("dataHora inválida");
    }

    if (createdAt.getTime() > Date.now()) {
      throw new TransactionValidationError("dataHora não pode estar no futuro");
    }

    return {
      amount: input.valor,
      createdAt
    };
  }
}
