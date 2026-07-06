# QA Automation Framework

Structure-first iteration of an enterprise-grade Playwright + TypeScript automation framework for banking and financial platforms. This scaffold is intentionally focused on architecture, dependency flow, execution separation, and extension seams rather than feature-complete test implementation.

## Technology Stack

- Playwright
- TypeScript
- Node.js
- dotenv
- Zod
- Faker
- GitHub Actions

## Current Iteration Scope

- Separate execution entry points for API, Web, and All tests
- Shared infrastructure across API and Web layers
- Centralized runtime and region configuration
- URL resolution through `BASE_URL`, `API_URL`, and `REGION`
- Region onboarding through data files instead of code changes
- API client, authentication, request builder, and facade skeletons
- Web page object, component object, flow, and action skeletons
- Custom fixtures and lightweight dependency injection through a composition root
- CI workflow with API-only, Web-only, and All-tests execution paths
- Architecture documentation for future implementation phases

## Folder Architecture

```text
.
|-- .github/workflows/
|-- config/
|   |-- playwright/
|   `-- regions/
|-- docs/
|-- src/
|   |-- api/
|   |-- core/
|   |-- shared/
|   `-- web/
|-- tests/
|   |-- api/
|   `-- web/
|-- .env.example
|-- package.json
|-- playwright.api.config.ts
|-- playwright.config.ts
|-- playwright.web.config.ts
`-- tsconfig.json
```

## How To Run

1. Install dependencies with `npm ci`
2. Copy `.env.example` to `.env`
3. Set `BASE_URL`, `API_URL`, and `REGION=eu` or another supported region code
4. Run one of the following:

- `npm run test:api`
- `npm run test:web`
- `npm run test:all`

## Configuration Model

- `BASE_URL`: web application host, provided at runtime through `.env`, CI variables, or secrets
- `API_URL`: API host, provided at runtime through `.env`, CI variables, or secrets
- `REGION`: selects the region descriptor under `config/regions`

Region files such as `eu.json`, `us.json`, and `uk.json` are still the right design, but they should describe regional behavior only:

- locale, currency, and timezone
- auth environment-variable mappings
- optional path prefixes
- default region headers
- user credential key mappings

They should not hardcode concrete application or API hostnames.

## Add A New Region

1. Add a new file under `config/regions`, for example `ca.json`
2. Keep the JSON shape aligned with the region schema
3. Provide the environment variables referenced by that region file
4. Provide `BASE_URL`, `API_URL`, and `REGION=ca`

No framework code changes are required because region loading is file-driven. The CI workflow can also consume region-specific `BASE_URL_<region>` and `API_URL_<region>` repository variables without changing the pipeline definition.

## Target Application Strategy

For future implementation, `https://demo.firefly-iii.org` is a reasonable candidate for the Web layer as long as it is passed only through `BASE_URL` and never hardcoded into source. I would not bake that URL into the framework itself.

If the chosen website does not expose a usable public API, the architecture still stands:

- keep the Web layer pointed at the public site through `BASE_URL`
- keep the API layer pointed at a public REST service, mock service, or internal demo backend through `API_URL`
- keep Web tests reusing API facades for setup or verification wherever the selected backend allows it

That means the framework contract stays unchanged even if the concrete API provider changes.


## Assumptions

- Region differences are configuration concerns, not test logic concerns
- Banking APIs may require multiple auth strategies across markets
- UI and API test teams should share factories, config, and utilities without coupling their test suites
- Enterprise adoption will require layered reporting, secrets management, and service virtualization in later iterations

## Future Improvements

- Implement real API modules and production-ready schema coverage
- Add domain-specific test data builders for customers, accounts, cards, and payments
- Introduce environment-aware secret providers for vault-backed authentication
- Add reporting enrichment, observability hooks, and trace correlation IDs
- Plug mobile automation into the same composition root and config model
