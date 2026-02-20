import type {
  CreateTransactionData,
  TransactionRepository
} from "../../../../domain/repositories/transaction-repository";
import type { Statistics } from "../../../../domain/value-objects/statistics";
import { prisma } from "../client";

export class PrismaTransactionRepository implements TransactionRepository {
  async create(data: CreateTransactionData): Promise<void> {
    await prisma.transaction.create({
      data: {
        amount: data.amount,
        createdAt: data.createdAt
      }
    });
  }

  async deleteAll(): Promise<void> {
    await prisma.transaction.deleteMany();
  }

  async getStatisticsSince(since: Date): Promise<Statistics> {
    const result = await prisma.transaction.aggregate({
      where: {
        createdAt: {
          gte: since
        }
      },
      _count: {
        _all: true
      },
      _sum: {
        amount: true
      },
      _avg: {
        amount: true
      },
      _min: {
        amount: true
      },
      _max: {
        amount: true
      }
    });

    return {
      count: result._count._all,
      sum: result._sum.amount ?? 0,
      avg: result._avg.amount ?? 0,
      min: result._min.amount ?? 0,
      max: result._max.amount ?? 0
    };
  }
}
