import type { TransactionRequestDTO } from "../dtos/transaction-request-dto";
import { TransactionValidationService } from "../../domain/services/transaction-validation-service";
import type { TransactionRepository } from "../../domain/repositories/transaction-repository";

export class CreateTransactionUseCase {
  constructor(
    private readonly repository: TransactionRepository,
    private readonly validationService: TransactionValidationService
  ) {}

  async execute(input: TransactionRequestDTO): Promise<void> {
    const valid = this.validationService.validate(input);

    await this.repository.create({
      amount: valid.amount,
      createdAt: valid.createdAt
    });
  }
}
