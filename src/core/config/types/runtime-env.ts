export interface RuntimeEnv {
  executionEnv: string;
  region: string;
  baseUrl: string;
  apiUrl: string;
  apiAuthMode: "none" | "static-token" | "client-credentials";
  apiAuthToken?: string;
  headless: boolean;
  workers: number | string;
  ciWorkers: number | string;
  retries: number;
  testTimeoutMs: number;
  expectTimeoutMs: number;
  navigationTimeoutMs: number;
  traceMode: "off" | "on" | "retain-on-failure" | "on-first-retry";
  screenshotMode: "off" | "on" | "only-on-failure";
  videoMode: "off" | "on" | "retain-on-failure" | "on-first-retry";
}
