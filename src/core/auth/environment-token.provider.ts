import { ConfigurationError } from "../errors/configuration.error";
import type { ClientCredentialsTokenProvider } from "./client-credentials.strategy";

export class EnvironmentTokenProvider implements ClientCredentialsTokenProvider {
  constructor(
    private readonly clientIdEnvKey: string,
    private readonly clientSecretEnvKey: string
  ) {}

  async getAccessToken(): Promise<string> {
    const clientId = process.env[this.clientIdEnvKey];
    const clientSecret = process.env[this.clientSecretEnvKey];

    if (!clientId || !clientSecret) {
      throw new ConfigurationError(
        `Missing client credentials in environment variables "${this.clientIdEnvKey}" or "${this.clientSecretEnvKey}".`
      );
    }

    return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  }
}

