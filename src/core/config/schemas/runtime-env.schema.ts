import { z } from "zod";

import type { RuntimeEnv } from "../types/runtime-env";

const workersSchema = z.union([z.coerce.number().int().positive(), z.string().regex(/^\d+%$/)]);

export const runtimeEnvSchema: z.ZodType<RuntimeEnv> = z.object({
  executionEnv: z.string().min(1),
  baseUrl: z.string().url(),
  apiUrl: z.string().url(),
  region: z.string().min(2).transform((value) => value.toLowerCase()),
  webPathPrefix: z.string().min(1),
  apiPathPrefix: z.string().min(1),
  apiAuthMode: z.enum(["none", "static-token", "client-credentials"]),
  apiAuthToken: z.string().optional(),
  apiClientId: z.string().optional(),
  apiClientSecret: z.string().optional(),
  webUsername: z.string().optional(),
  webPassword: z.string().optional(),
  headless: z.coerce.boolean(),
  workers: workersSchema,
  ciWorkers: workersSchema,
  retries: z.coerce.number().int().min(0),
  testTimeoutMs: z.coerce.number().int().positive(),
  expectTimeoutMs: z.coerce.number().int().positive(),
  navigationTimeoutMs: z.coerce.number().int().positive(),
  traceMode: z.enum(["off", "on", "retain-on-failure", "on-first-retry"]),
  screenshotMode: z.enum(["off", "on", "only-on-failure"]),
  videoMode: z.enum(["off", "on", "retain-on-failure", "on-first-retry"])
});
