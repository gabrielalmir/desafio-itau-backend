import type { StatisticsResponseDTO } from "../dtos/statistics-response-dto";
import type { TransactionRepository } from "../../domain/repositories/transaction-repository";

export class InvalidIntervalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidIntervalError";
  }
}

export class GetStatisticsUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  async execute(intervalInSecondsRaw?: string): Promise<StatisticsResponseDTO> {
    const interval = this.parseInterval(intervalInSecondsRaw);
    const since = new Date(Date.now() - interval * 1000);
    return this.repository.getStatisticsSince(since);
  }

  private parseInterval(raw?: string): number {
    if (raw === undefined || raw === "") {
      return 60;
    }

    const interval = Number(raw);

    if (!Number.isInteger(interval) || interval < 0) {
      throw new InvalidIntervalError("intervaloBusca inválido");
    }

    return interval;
  }
}
