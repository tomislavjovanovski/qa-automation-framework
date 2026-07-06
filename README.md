# QA Automation Framework

A modular **Playwright + TypeScript** automation framework designed for scalable API and Web testing. The framework demonstrates enterprise-level architecture where API and Web layers are independently executable while sharing common infrastructure, configuration, and utilities.

## Key Features

- Independent API and Web execution
- Shared fixtures and infrastructure
- Multi-region support through configuration
- API and Web orchestration
- Page Object Model with reusable Flows
- Schema validation using Zod
- Environment-driven configuration
- GitHub Actions ready

## Tech Stack

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

Tests remain thin and delegate implementation to reusable Page Objects, Flows and API modules.

## Design Principles

- API and Web are independently runnable.
- Shared infrastructure through fixtures.
- Region switching is configuration-driven.
- Tests describe business scenarios.
- Page Objects encapsulate UI logic.
- API modules encapsulate service communication.

## API & Web Integration

```text
API → Prepare / Verify Data
        │
        ▼
Web → Execute User Flow
        │
        ▼
Assertions
```

## Multi-Region Support

Changing region only requires updating configuration.

```env
REGION=eu
```

No test code changes are required.

## Running

```bash
npm ci
npx playwright install

npm run test:api
npm run test:web
npm run test:all
```

## Configuration

Main configuration is managed through `.env`.

Typical settings:

- BASE_URL
- API_URL
- REGION
- WEB_USERNAME
- WEB_PASSWORD
- HEADLESS
- WORKERS
- RETRIES

## Assignment Coverage

- API and Web layers are independently runnable
- Shared infrastructure
- Multi-region support
- Happy, Negative and Edge scenarios
- API used for Web setup/verification
- API schema validation
- GitHub Actions ready