import { z } from "zod";

import type { RuntimeEnv } from "../types/runtime-env";

const booleanFromString = z.string().transform((value) => value.toLowerCase() === "true");
const workersSchema = z.union([z.string(), z.coerce.number().int().positive()]);

export const runtimeEnvSchema: z.ZodType<RuntimeEnv> = z.object({
  executionEnv: z.string().min(1),
  baseUrl: z.string().url(),
  apiUrl: z.string().url(),
  region: z.string().min(2).transform((value) => value.toLowerCase()),
  apiAuthMode: z.enum(["none", "static-token", "client-credentials"]),
  apiAuthToken: z.string().optional(),
  headless: booleanFromString,
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
