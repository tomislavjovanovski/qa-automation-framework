import type { RuntimeEnv } from "./runtime-env";

export interface ChannelRuntimeConfig {
  baseUrl: string;
  pathPrefix: string;
}

export interface ApiRuntimeConfig extends ChannelRuntimeConfig {
  defaultHeaders: Record<string, string>;
}

export interface AppConfig {
  runtime: RuntimeEnv;
  services: {
    web: ChannelRuntimeConfig;
    api: ApiRuntimeConfig;
  };
}
