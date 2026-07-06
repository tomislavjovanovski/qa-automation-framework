import type { AppConfig } from "../config/types/app-config";
import { ConfigurationError } from "../errors/configuration.error";
import type { AuthStrategy } from "./auth-strategy";
import { BearerTokenStrategy } from "./bearer-token.strategy";
import { ClientCredentialsStrategy } from "./client-credentials.strategy";
import { EnvironmentTokenProvider } from "./environment-token.provider";
import { NoAuthStrategy } from "./no-auth.strategy";

export class AuthStrategyFactory {
  static create(appConfig: AppConfig): AuthStrategy {
    const runtimeMode = appConfig.runtime.apiAuthMode;

    if (runtimeMode === "none") {
      return new NoAuthStrategy();
    }

    if (runtimeMode === "static-token") {
      if (!appConfig.runtime.apiAuthToken) {
        throw new ConfigurationError("API_AUTH_TOKEN must be provided when API_AUTH_MODE=static-token.");
      }

      return new BearerTokenStrategy(appConfig.runtime.apiAuthToken);
    }

    const { clientIdEnvKey, clientSecretEnvKey } = appConfig.region.api.auth;

    if (!clientIdEnvKey || !clientSecretEnvKey) {
      throw new ConfigurationError(
        `Region "${appConfig.region.code}" is missing client credential environment key mapping.`
      );
    }

    return new ClientCredentialsStrategy(
      new EnvironmentTokenProvider(clientIdEnvKey, clientSecretEnvKey)
    );
  }
}

