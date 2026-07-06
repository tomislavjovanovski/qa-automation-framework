export interface RegionApiAuthConfig {
  strategy: "none" | "static-token" | "client-credentials";
  clientIdEnvKey?: string;
  clientSecretEnvKey?: string;
  scope?: string;
}

export interface RegionConfig {
  code: string;
  locale: string;
  currency: string;
  timeZone: string;
  api: {
    pathPrefix?: string;
    defaultHeaders?: Record<string, string>;
    auth: RegionApiAuthConfig;
  };
  web: {
    pathPrefix?: string;
  };
  users: {
    retailUsernameEnvKey: string;
    retailPasswordEnvKey: string;
  };
}
