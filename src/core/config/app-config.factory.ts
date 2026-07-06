import type { AppConfig } from "./types/app-config";
import { RuntimeEnvLoader } from "./loaders/runtime-env.loader";
import { UrlResolver } from "./url.resolver";

export class AppConfigFactory {
  private static cachedConfig: AppConfig | undefined;

  static create(): AppConfig {
    if (!this.cachedConfig) {
      const runtime = RuntimeEnvLoader.load();

      this.cachedConfig = {
        runtime,
        services: {
          web: {
            baseUrl: UrlResolver.resolve(runtime.baseUrl, runtime.webPathPrefix),
            pathPrefix: runtime.webPathPrefix
          },
          api: {
            baseUrl: UrlResolver.resolve(runtime.apiUrl, runtime.apiPathPrefix),
            pathPrefix: runtime.apiPathPrefix,
            defaultHeaders: {
              "x-test-region": runtime.region
            }
          }
        }
      };
    }

    return this.cachedConfig;
  }
}
