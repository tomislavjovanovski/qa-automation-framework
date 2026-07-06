import { defineConfig, devices, type PlaywrightTestConfig, type Project } from "@playwright/test";

import { AppConfigFactory } from "../../src/core/config/app-config.factory";

export type TestLayer = "all" | "api" | "web";

const appConfig = AppConfigFactory.create();

export function createPlaywrightConfig(layer: TestLayer): PlaywrightTestConfig {
  const sharedConfig: PlaywrightTestConfig = {
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: appConfig.runtime.retries,
    workers: process.env.CI ? appConfig.runtime.ciWorkers : appConfig.runtime.workers,
    timeout: appConfig.runtime.testTimeoutMs,
    expect: {
      timeout: appConfig.runtime.expectTimeoutMs
    },
    reporter: [
      ["list"],
      ["html", { open: "never" }]
    ],
    outputDir: "test-results"
  };

  if (layer === "all") {
    return defineConfig({
      ...sharedConfig,
      testDir: "./tests",
      projects: [buildApiProject(), buildWebProject()]
    });
  }

  return defineConfig({
    ...sharedConfig,
    testDir: layer === "api" ? "./tests/api" : "./tests/web",
    projects: [layer === "api" ? buildApiProject() : buildWebProject()]
  });
}

function buildApiProject(): Project {
  return {
    name: `${appConfig.region.code}-api`,
    testDir: "./tests/api",
    use: {
      baseURL: appConfig.services.api.baseUrl,
      extraHTTPHeaders: {
        ...appConfig.services.api.defaultHeaders,
        "x-test-region": appConfig.region.code
      },
      trace: appConfig.runtime.traceMode,
      screenshot: appConfig.runtime.screenshotMode,
      video: appConfig.runtime.videoMode
    }
  };
}

function buildWebProject(): Project {
  return {
    name: `${appConfig.region.code}-web`,
    testDir: "./tests/web",
    use: {
      ...devices["Desktop Chrome"],
      baseURL: appConfig.services.web.baseUrl,
      headless: appConfig.runtime.headless,
      navigationTimeout: appConfig.runtime.navigationTimeoutMs,
      trace: appConfig.runtime.traceMode,
      screenshot: appConfig.runtime.screenshotMode,
      video: appConfig.runtime.videoMode
    }
  };
}
