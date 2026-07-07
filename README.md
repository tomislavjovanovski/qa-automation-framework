# QA Automation Framework

## Overview

This project is a Playwright + TypeScript automation framework created as part of the technical assignment.

It supports API and Web testing with shared infrastructure while allowing both layers to run independently. The framework is configuration-driven and can be extended to support additional regions without changing the test implementation.

## Technologies

- Playwright
- TypeScript
- Node.js
- Zod
- Faker
- dotenv
- GitHub Actions

## Structure and Folder Responsibilities

```text
.
|-- .github/workflows/        # CI pipeline
|-- config/
|   |-- environments/         # Region and environment profiles used by the config loader
|   `-- playwright/           # Playwright config helpers shared by api/web/all runs
|-- src/
|   |-- api/                  # API facades, request builders, schemas, and types
|   |-- core/                 # Framework backbone: config loading, auth, HTTP client, DI
|   |-- shared/               # Shared fixtures, constants, factories, and utilities for both layers
|   `-- web/                  # Page objects, components, actions, and flows for UI tests
|-- tests/
|   |-- api/                  # Thin API test scenarios; describe behavior and delegate to src/api
|   `-- web/                  # Thin Web test scenarios; describe behavior and delegate to src/web
|-- .env                     # Local runtime configuration for the framework
|-- package.json             # Scripts and dependencies
|-- playwright.api.config.ts # API-only Playwright config entrypoint
|-- playwright.config.ts     # Combined Playwright config entrypoint
|-- playwright.web.config.ts # Web-only Playwright config entrypoint
`-- tsconfig.json           # TypeScript compiler configuration
```

## Architecture

```text
                 Tests
                    │
               Fixtures
                    │
                    ▼
            TestContextFactory
                    │
         ┌──────────┴──────────┐
         │                     │
     API Context         Web Context
         │                     │
 Configuration,         shared API Context
 API Modules,           + Web Pages / Flows
 Factories
```

Tests stay focused on business scenarios, while fixtures provide `apiContext` and `webContext` through `apiTest` and `webTest`. `TestContextFactory` creates those contexts, assembling shared configuration from `AppConfigFactory`, API facades, factories, and the Web layer abstractions so that tests do not need to manage framework wiring directly.

## Shared Infrastructure

API and Web tests run as separate Playwright projects while sharing the same configuration, fixtures, test context, and utilities. This keeps both layers consistent without forcing them into the same execution path. Shared infrastructure exists to avoid duplicating common concerns such as configuration loading, HTTP access, auth handling, and reusable test data setup.

## Multi-Region Support

The active region is selected through configuration.

```env
REGION=eu
```

Region switching is handled through configuration and shared factories rather than test logic. Adding a new region only requires new configuration values. Test code remains unchanged.

## Running

```bash
npm ci
npx playwright install

npm run test:api
npm run test:web
npm run test:all
```

API and Web can be executed independently for faster feedback, or together when full coverage is needed.

## Configuration

Configuration is managed through `.env` and environment overlays under `config/environments`. `AppConfigFactory` centralizes runtime values before tests start so the same configuration model is used across both API and Web layers.

Typical settings:

- BASE_URL
- API_URL
- REGION
- WEB_USERNAME
- WEB_PASSWORD
- HEADLESS
- WORKERS
- RETRIES

## Continuous Integration

GitHub Actions supports running API tests, Web tests, or both through a suite and region matrix. By default, `push` and `pull_request` run against the `eu` region, while `workflow_dispatch` allows broader execution by suite or region when needed.

