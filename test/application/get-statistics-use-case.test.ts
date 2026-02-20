import { describe, expect, it } from "bun:test";
import {
  GetStatisticsUseCase,
  InvalidIntervalError
} from "../../src/application/use-cases/get-statistics-use-case";
import type { TransactionRepository } from "../../src/domain/repositories/transaction-repository";

class FakeTransactionRepository implements TransactionRepository {
  async create(): Promise<void> {}
  async deleteAll(): Promise<void> {}
  async getStatisticsSince(): Promise<{ count: number; sum: number; avg: number; min: number; max: number }> {
    return {
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0
    };
  }
}

describe("GetStatisticsUseCase", () => {
  const repository = new FakeTransactionRepository();
  const useCase = new GetStatisticsUseCase(repository);

  it("uses default interval when value is not informed", async () => {
    const stats = await useCase.execute();
    expect(stats.count).toBe(0);
  });

  it("rejects invalid interval", async () => {
    expect(useCase.execute("invalid")).rejects.toThrow(InvalidIntervalError);
  });
});
