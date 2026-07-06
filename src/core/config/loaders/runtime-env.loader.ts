import { config as loadDotEnv } from "dotenv";

import { ConfigurationError } from "../../errors/configuration.error";
import { runtimeEnvSchema } from "../schemas/runtime-env.schema";
import type { RuntimeEnv } from "../types/runtime-env";

loadDotEnv();

export class RuntimeEnvLoader {
  static load(source: NodeJS.ProcessEnv = process.env): RuntimeEnv {
    const parsed = runtimeEnvSchema.safeParse({
      executionEnv: source.EXECUTION_ENV ?? "local",
      baseUrl: source.BASE_URL,
      apiUrl: source.API_URL,
      region: source.REGION ?? "eu",
      apiAuthMode: source.API_AUTH_MODE ?? "none",
      apiAuthToken: source.API_AUTH_TOKEN,
      headless: source.HEADLESS ?? "true",
      workers: source.WORKERS ?? "50%",
      ciWorkers: source.CI_WORKERS ?? 2,
      retries: source.RETRIES ?? 1,
      testTimeoutMs: source.TEST_TIMEOUT_MS ?? 60000,
      expectTimeoutMs: source.EXPECT_TIMEOUT_MS ?? 10000,
      navigationTimeoutMs: source.NAVIGATION_TIMEOUT_MS ?? 30000,
      traceMode: source.TRACE_MODE ?? "on-first-retry",
      screenshotMode: source.SCREENSHOT_MODE ?? "only-on-failure",
      videoMode: source.VIDEO_MODE ?? "retain-on-failure"
    });

    if (!parsed.success) {
      throw new ConfigurationError(`Invalid runtime environment configuration: ${parsed.error.message}`);
    }

    return parsed.data;
  }
}
