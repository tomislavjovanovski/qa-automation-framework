# QA Automation Framework

Playwright + TypeScript framework for API and Web testing with shared infrastructure, independent execution, and environment-driven region switching.

## What This Framework Solves

- API and Web are runnable separately or together
- Shared infrastructure across API and Web layers
- Switching region does not require test code changes
- Configuration is centralized through `.env` and profile files
- API clients, fixtures, page objects, and flows are structured for reuse
- CI can run `api`, `web`, or `all`

## Stack

- Playwright
- TypeScript
- Node.js
- dotenv
- Zod
- Faker
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
|-- .env.example             # Example environment configuration
|-- package.json             # Scripts and dependencies
|-- playwright.api.config.ts # API-only Playwright config entrypoint
|-- playwright.config.ts     # Combined Playwright config entrypoint
|-- playwright.web.config.ts # Web-only Playwright config entrypoint
`-- tsconfig.json           # TypeScript compiler configuration
```

### Example: reading a typical test file

The example below shows the intended pattern. The test itself is a scenario description, while the reusable implementation lives in the `src/` folders.

```ts
import { webTest as test } from "../../../src/shared/fixtures/web.fixture";
import { TEST_TAGS } from "../../../src/shared/constants/test-tags";

test.describe("Retail login journey with API orchestration", () => {
  test(
    `${TEST_TAGS.web} ${TEST_TAGS.happyPath} authenticates user after API setup`,
    async ({ webContext }) => {
      // The shared fixture supplies the web context.
      // Real implementation would call flows/pages from src/web/.
      void webContext;
    }
  );

  test(`${TEST_TAGS.web} ${TEST_TAGS.negative} blocks invalid credentials`, async ({ webContext }) => {
    // This is a placeholder scenario showing the expected structure.
    void webContext;
  });
});
```

### What to look for when onboarding

1. Start in `tests/` to understand the business goal of the scenario.
2. Follow the imports to see which reusable layer is being used.
3. If the test uses UI behavior, inspect `src/web/`.
4. If the test uses API behavior, inspect `src/api/`.
5. If it needs shared setup or data, inspect `src/shared/`.

## Run Locally

1. Install dependencies with `npm ci`
2. A default `.env` is already included and points to `https://demo.firefly-iii.org`
3. Change `REGION` or URLs only if needed
4. Run one of the following:

- `npm run test:api`
- `npm run test:web`
- `npm run test:all`

## Configuration

- `BASE_URL`: web application URL
- `API_URL`: API base URL
- `REGION`: active region such as `eu`, `us`, or `uk`
- `WEB_PATH_PREFIX` and `API_PATH_PREFIX`: optional subpaths
- `WEB_USERNAME` and `WEB_PASSWORD`: shared web credentials
- `API_CLIENT_ID` and `API_CLIENT_SECRET`: shared API credentials

The config loader supports layering:

- `.env`
- `config/environments/<executionEnv>.env`
- `config/environments/<region>.env`
- `config/environments/<executionEnv>.<region>.env`

CI or shell environment variables still win over file-based values.

The default `.env` and example files are prefilled with the Firefly demo host to make startup easier.

## Design Notes

- Tests, page objects, and API modules do not read `process.env` directly
- Playwright config is split into `api`, `web`, and `all`
- Web tests can reuse API modules through shared fixtures
- The current repo is a structure-first iteration, so specs are still skeletons

If the selected website has no public API, the framework shape still works:

- Web stays pointed at `BASE_URL`
- API stays pointed at `API_URL`
- only the concrete API target changes, not the framework structure

## Assumptions

- Region differences are configuration concerns, not test logic concerns
- Banking APIs may require multiple auth strategies across markets
- UI and API test teams should share factories, config, and utilities without coupling their test suites
- Reporting and richer test implementation would come in the next iteration

## Future Improvements

- Implement real public API coverage and real Web flows
- Add happy path, negative, and idempotency scenarios end-to-end
- Add reporting enrichment and better test data support
- Extend the same structure for mobile later
