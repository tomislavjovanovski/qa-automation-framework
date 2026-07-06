import type { AuthStrategy } from "./auth-strategy";

export interface ClientCredentialsTokenProvider {
  getAccessToken(): Promise<string>;
}

export class ClientCredentialsStrategy implements AuthStrategy {
  constructor(private readonly tokenProvider: ClientCredentialsTokenProvider) {}

  async getHeaders(): Promise<Record<string, string>> {
    const accessToken = await this.tokenProvider.getAccessToken();

    return {
      Authorization: `Bearer ${accessToken}`
    };
  }
}

