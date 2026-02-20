export type AppConfig = {
  host: string;
  port: number;
  databaseUrl: string;
  apiSecret: string;
  httpsEnabled: boolean;
  httpsCertPath?: string;
  httpsKeyPath?: string;
};

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === "") {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
}

function parsePort(value: string | undefined): number {
  const fallback = 8080;

  if (!value) {
    return fallback;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error("PORT inválida");
  }

  return port;
}

export function getConfig(env = process.env): AppConfig {
  const apiSecret = env.API_SECRET;

  if (!apiSecret) {
    throw new Error("API_SECRET é obrigatória");
  }

  const httpsEnabled = parseBoolean(env.HTTPS_ENABLED, false);

  return {
    host: env.HOST || "0.0.0.0",
    port: parsePort(env.PORT),
    databaseUrl: env.DATABASE_URL || "file:./prisma/dev.db",
    apiSecret,
    httpsEnabled,
    httpsCertPath: env.HTTPS_CERT_PATH || undefined,
    httpsKeyPath: env.HTTPS_KEY_PATH || undefined
  };
}
