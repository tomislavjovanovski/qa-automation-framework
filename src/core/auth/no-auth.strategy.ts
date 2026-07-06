import type { AuthStrategy } from "./auth-strategy";

export class NoAuthStrategy implements AuthStrategy {
  async getHeaders(): Promise<Record<string, string>> {
    return {};
  }
}

