import type { AuthStrategy } from "./auth-strategy";

export class BearerTokenStrategy implements AuthStrategy {
  constructor(private readonly token: string) {}

  async getHeaders(): Promise<Record<string, string>> {
    return {
      Authorization: `Bearer ${this.token}`
    };
  }
}

