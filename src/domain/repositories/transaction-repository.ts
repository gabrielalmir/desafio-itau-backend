import type { Statistics } from "../value-objects/statistics";

export type CreateTransactionData = {
  amount: number;
  createdAt: Date;
};

export interface TransactionRepository {
  create(data: CreateTransactionData): Promise<void>;
  deleteAll(): Promise<void>;
  getStatisticsSince(since: Date): Promise<Statistics>;
}
