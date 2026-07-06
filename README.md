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
   ▼
Fixtures
   │
   ▼
Test Context
   │
   ├── API Modules
   ├── Web Pages
   ├── Flows
   ├── Factories
   └── Configuration
```

Tests focus on business scenarios while implementation details are encapsulated inside Page Objects, Flows and API modules.

## Shared Infrastructure

API and Web tests run as separate Playwright projects while sharing the same configuration, fixtures, test context and utilities.

## Multi-Region Support

The active region is selected through configuration.

```env
REGION=eu
```

Adding a new region only requires new configuration values. Test code remains unchanged.

## Running

```bash
npm ci
npx playwright install

npm run test:api
npm run test:web
npm run test:all
```

## Configuration

Configuration is managed through `.env`.

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

GitHub Actions supports running:

- API tests
- Web tests
- Complete test suite
