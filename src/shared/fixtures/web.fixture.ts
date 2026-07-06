import { test as base, expect } from "@playwright/test";

import { AppConfigFactory } from "@core/config/app-config.factory";
import { TestContextFactory } from "@core/di/test-context.factory";
import type { AppConfig } from "@core/config/types/app-config";
import type { WebTestContext } from "@shared/types/test-context.types";

type WebFixtures = {
  appConfig: AppConfig;
  webContext: WebTestContext;
};

export const webTest = base.extend<WebFixtures>({
  appConfig: async ({}, use) => {
    await use(AppConfigFactory.create());
  },
  webContext: async ({ request, page, appConfig }, use) => {
    await use(
      TestContextFactory.createWebContext({
        request,
        page,
        appConfig
      })
    );
  }
});

export { expect };

