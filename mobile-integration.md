# Mobile Integration Design

## Overview

This document describes how mobile testing could be integrated into the
existing framework without changing its current architecture. The goal
is to extend the framework by reusing the existing shared infrastructure
rather than introducing a separate mobile automation project.

## How Mobile Fits the Current Framework

The framework already follows a consistent execution model for API and
Web:

``` text
Tests
   │
   ▼
Fixtures
   │
   ▼
Test Context
   │
   ├── Layer Abstractions
   ├── Factories
   └── Configuration
```

A Mobile layer would follow the same pattern. A `mobile.fixture.ts`
would become the execution boundary, `MobileTestContext` would expose
mobile-specific dependencies, and `TestContextFactory` would remain
responsible for assembling shared configuration, factories, and reusable
services.

This keeps Mobile aligned with the existing architecture instead of
introducing a different execution model.

## Proposed Folder Structure

Only the following additions would be required:

``` text
src/
├── api/
├── core/
├── shared/
│   ├── fixtures/
│   │   ├── api.fixture.ts
│   │   ├── web.fixture.ts
│   │   └── mobile.fixture.ts      # NEW
│   └── ...
├── web/
└── mobile/                        # NEW
    ├── pages/                     # NEW
    ├── flows/                     # NEW
    ├── components/                # NEW
    ├── drivers/                   # NEW (Appium)
    └── context/                   # NEW

tests/
├── api/
├── web/
└── mobile/                        # NEW
```

## Shared Infrastructure

The Mobile layer would reuse the same infrastructure already used by API
and Web:

-   AppConfigFactory
-   TestContextFactory
-   shared fixtures
-   shared factories
-   shared utilities
-   environment configuration
-   API facades for setup and verification
-   reporting and logging

The objective is to reuse the existing composition model and avoid
duplicating configuration, dependency injection, or common support
logic.

## Automation Driver

Playwright would continue to be used for API and Web automation.

For native Android and iOS applications, **Appium** would be introduced
as the mobile automation driver. Only the automation driver changes; the
surrounding framework architecture remains the same.

## Mobile Fixture

A new `mobile.fixture.ts` would follow the same pattern as the existing
`api.fixture.ts` and `web.fixture.ts`.

The fixture would create a `MobileTestContext`, allowing mobile tests to
reuse the current dependency injection, configuration, factories, API
facades, and shared utilities while exposing mobile-specific pages and
flows.

## Configuration and Execution

Mobile automation would follow the same configuration-driven approach
already used by the framework. Region selection would remain
externalized through configuration, while mobile-specific settings (such
as device, platform, Appium server, and application path) would be added
through the existing configuration model.

API, Web, and Mobile would remain independently executable.

## CI/CD

Mobile automation would become an additional execution layer in the
existing GitHub Actions pipeline.

``` text
GitHub Actions
        │
 ┌──────┼────────┐
 │      │        │
API    WEB    MOBILE
                │
             Appium
                │
      Android / iOS Device
```

The Mobile job would start an Appium server (or connect to BrowserStack,
Sauce Labs, or a self-hosted device farm) before executing the mobile
suite. Reporting, configuration, and execution would remain consistent
across all layers.

## Summary

The current framework does not implement mobile automation yet, but its
architecture is designed to support it. By introducing a Mobile fixture,
`MobileTestContext`, and an Appium driver, Android and iOS automation
can integrate into the existing dependency injection, configuration,
reporting, and CI/CD model without changing the current API or Web
architecture.
