import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse as parseDotEnv } from "dotenv";

import { ConfigurationError } from "../../errors/configuration.error";
import { runtimeEnvSchema } from "../schemas/runtime-env.schema";
import type { RuntimeEnv } from "../types/runtime-env";

export class RuntimeEnvLoader {
  private static isBootstrapped = false;
  private static readonly protectedEnvKeys = new Set(Object.keys(process.env));

  static load(source: NodeJS.ProcessEnv = process.env): RuntimeEnv {
    this.bootstrapEnvFiles();

    const parsed = runtimeEnvSchema.safeParse({
      executionEnv: source.EXECUTION_ENV ?? "local",
      baseUrl: source.BASE_URL,
      apiUrl: source.API_URL,
      region: source.REGION ?? "eu",
      webPathPrefix: source.WEB_PATH_PREFIX ?? "/",
      apiPathPrefix: source.API_PATH_PREFIX ?? "/",
      apiAuthMode: source.API_AUTH_MODE ?? "none",
      apiAuthToken: source.API_AUTH_TOKEN,
      apiClientId: source.API_CLIENT_ID,
      apiClientSecret: source.API_CLIENT_SECRET,
      webUsername: source.WEB_USERNAME,
      webPassword: source.WEB_PASSWORD,
      paymentSourceAccountId: source.PAYMENT_SOURCE_ACCOUNT_ID,
      paymentDestinationAccountId: source.PAYMENT_DESTINATION_ACCOUNT_ID,
      paymentAmount: source.PAYMENT_AMOUNT,
      paymentCurrency: source.PAYMENT_CURRENCY,
      paymentIdempotencyKeyPrefix: source.PAYMENT_IDEMPOTENCY_KEY_PREFIX,
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

  private static bootstrapEnvFiles(): void {
    if (this.isBootstrapped) {
      return;
    }

    this.loadIfExists(path.resolve(process.cwd(), ".env"));

    const executionEnv = process.env.EXECUTION_ENV ?? "local";
    const region = (process.env.REGION ?? "eu").toLowerCase();

    this.loadIfExists(path.resolve(process.cwd(), "config", "environments", `${executionEnv}.env`));
    this.loadIfExists(path.resolve(process.cwd(), "config", "environments", `${region}.env`));
    this.loadIfExists(
      path.resolve(process.cwd(), "config", "environments", `${executionEnv}.${region}.env`)
    );

    this.isBootstrapped = true;
  }

  private static loadIfExists(filePath: string): void {
    if (existsSync(filePath)) {
      const parsed = parseDotEnv(readFileSync(filePath));

      Object.entries(parsed).forEach(([key, value]) => {
        if (!this.protectedEnvKeys.has(key)) {
          process.env[key] = value;
        }
      });
    }
  }
}
