import type { TransactionRepository } from "../../domain/repositories/transaction-repository";

export class DeleteTransactionsUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  async execute(): Promise<void> {
    await this.repository.deleteAll();
  }
}
