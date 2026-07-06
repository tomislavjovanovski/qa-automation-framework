import type { AppConfig } from "./types/app-config";
import { RegionConfigLoader } from "./loaders/region-config.loader";
import { RuntimeEnvLoader } from "./loaders/runtime-env.loader";
import { UrlResolver } from "./url.resolver";

export class AppConfigFactory {
  private static cachedConfig: AppConfig | undefined;

  static create(): AppConfig {
    if (!this.cachedConfig) {
      const runtime = RuntimeEnvLoader.load();
      const region = RegionConfigLoader.load(runtime.region);

      this.cachedConfig = {
        runtime,
        region,
        services: {
          web: {
            baseUrl: UrlResolver.resolve(runtime.baseUrl, region.web.pathPrefix),
            pathPrefix: region.web.pathPrefix ?? "/"
          },
          api: {
            baseUrl: UrlResolver.resolve(runtime.apiUrl, region.api.pathPrefix),
            pathPrefix: region.api.pathPrefix ?? "/",
            defaultHeaders: region.api.defaultHeaders ?? {}
          }
        }
      };
    }

    return this.cachedConfig;
  }
}
