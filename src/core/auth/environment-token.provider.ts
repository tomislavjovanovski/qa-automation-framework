import { ConfigurationError } from "../errors/configuration.error";
import type { ClientCredentialsTokenProvider } from "./client-credentials.strategy";

export class EnvironmentTokenProvider implements ClientCredentialsTokenProvider {
  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async getAccessToken(): Promise<string> {
    if (!this.clientId || !this.clientSecret) {
      throw new ConfigurationError("Missing API client credentials in centralized runtime configuration.");
    }

    return Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
  }
}
