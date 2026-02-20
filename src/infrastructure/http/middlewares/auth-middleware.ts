export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export function ensureBearerToken(authorizationHeader: string | null, expectedSecret: string): void {
  if (!authorizationHeader) {
    throw new UnauthorizedError("token não informado");
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new UnauthorizedError("formato de token inválido");
  }

  if (token !== expectedSecret) {
    throw new UnauthorizedError("token inválido");
  }
}
