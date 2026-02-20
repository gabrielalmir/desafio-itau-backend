import { describe, expect, it } from "bun:test";
import {
  TransactionValidationError,
  TransactionValidationService
} from "../../src/domain/services/transaction-validation-service";

describe("TransactionValidationService", () => {
  const service = new TransactionValidationService();

  it("accepts valid transaction", () => {
    const result = service.validate({
      valor: 150,
      dataHora: new Date().toISOString()
    });

    expect(result.amount).toBe(150);
    expect(result.createdAt).toBeInstanceOf(Date);
  });

  it("rejects future date", () => {
    expect(() =>
      service.validate({
        valor: 10,
        dataHora: new Date(Date.now() + 10_000).toISOString()
      })
    ).toThrow(TransactionValidationError);
  });

  it("rejects invalid amount", () => {
    expect(() =>
      service.validate({
        valor: 0,
        dataHora: new Date().toISOString()
      })
    ).toThrow(TransactionValidationError);
  });
});
