import { readFile } from "node:fs/promises";
import { getConfig } from "./config/env";
import { app } from "./infrastructure/http/app";

const config = getConfig();

type TlsConfig = {
  key: string;
  cert: string;
};

async function loadTlsConfig(): Promise<TlsConfig | undefined> {
  if (!config.httpsEnabled) {
    return undefined;
  }

  if (!config.httpsKeyPath || !config.httpsCertPath) {
    throw new Error("HTTPS habilitado, mas HTTPS_KEY_PATH/HTTPS_CERT_PATH não configurados");
  }

  const [key, cert] = await Promise.all([
    readFile(config.httpsKeyPath, "utf8"),
    readFile(config.httpsCertPath, "utf8")
  ]);

  return { key, cert };
}

const tls = await loadTlsConfig();

const server = Bun.serve({
  hostname: config.host,
  port: config.port,
  fetch: app,
  tls
});

const protocol = tls ? "https" : "http";
console.log(`Server running on ${protocol}://${config.host}:${server.port}`);
