import { z } from "zod";

import type { RegionConfig } from "../types/region-config";

export const regionConfigSchema: z.ZodType<RegionConfig> = z.object({
  code: z.string().min(2),
  locale: z.string().min(2),
  currency: z.string().length(3),
  timeZone: z.string().min(2),
  api: z.object({
    pathPrefix: z.string().optional(),
    defaultHeaders: z.record(z.string()).optional(),
    auth: z.object({
      strategy: z.enum(["none", "static-token", "client-credentials"]),
      clientIdEnvKey: z.string().optional(),
      clientSecretEnvKey: z.string().optional(),
      scope: z.string().optional()
    })
  }),
  web: z.object({
    pathPrefix: z.string().optional()
  }),
  users: z.object({
    retailUsernameEnvKey: z.string().min(1),
    retailPasswordEnvKey: z.string().min(1)
  })
});
