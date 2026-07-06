import { test as base, expect } from "@playwright/test";

import { AppConfigFactory } from "@core/config/app-config.factory";
import { TestContextFactory } from "@core/di/test-context.factory";
import type { AppConfig } from "@core/config/types/app-config";
import type { ApiTestContext } from "@shared/types/test-context.types";

type ApiFixtures = {
  appConfig: AppConfig;
  apiContext: ApiTestContext;
};

export const apiTest = base.extend<ApiFixtures>({
  appConfig: async ({}, use) => {
    await use(AppConfigFactory.create());
  },
  apiContext: async ({ request, appConfig }, use) => {
    await use(
      TestContextFactory.createApiContext({
        request,
        appConfig
      })
    );
  }
});

export { expect };

