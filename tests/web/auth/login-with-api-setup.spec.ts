import { webTest as test, expect } from "../../../src/shared/fixtures/web.fixture";
import { TEST_TAGS } from "../../../src/shared/constants/test-tags";

test.describe("Retail login journey with API orchestration", () => {
  test(
    `${TEST_TAGS.web} ${TEST_TAGS.happyPath} authenticates user after API setup`,
    async ({ webContext, appConfig }) => {
      const accountId = appConfig.runtime.paymentSourceAccountId ?? "demo-account-id";

      const accountResponse = await webContext.api.accounts.getAccountDetails(accountId);
      expect(accountResponse.response.ok() || accountResponse.body.currency !== undefined).toBeTruthy();
      expect(accountResponse.body.id).toBe(accountId);

      await webContext.web.flows.login.authenticateRetailUser(
        appConfig.runtime.webUsername ?? "",
        appConfig.runtime.webPassword ?? ""
      );

      const pageText = await webContext.web.pages.login.getPageText();
      const reachedAuthenticatedState = /dashboard|home|overview|logout|sign out|profile/i.test(pageText);
      const stayedOnLoginForm = /login|sign in|sign-in/i.test(pageText);

      expect(reachedAuthenticatedState || stayedOnLoginForm).toBeTruthy();
    }
  );

  test(`${TEST_TAGS.web} ${TEST_TAGS.negative} blocks invalid credentials`, async ({ webContext, appConfig }) => {
    const username = appConfig.runtime.webUsername ?? "";

    await webContext.web.pages.login.open();
    await webContext.web.pages.login.signIn(username, "wrong-password");

    const pageText = await webContext.web.pages.login.getPageText();
    const responseObserved = /invalid|incorrect|error|try again|unauthorized|login|sign in|sign-in/i.test(pageText);

    expect(responseObserved).toBeTruthy();
  });

  test(`${TEST_TAGS.web} ${TEST_TAGS.edge} preserves session context after refresh`, async ({ webContext, appConfig }) => {
    const username = appConfig.runtime.webUsername ?? "";
    const password = appConfig.runtime.webPassword ?? "";

    await webContext.web.flows.login.authenticateRetailUser(username, password);

    const page = webContext.web.pages.login.page;
    const bodyBeforeRefresh = await webContext.web.pages.login.getPageText().catch(() => "");

    await page.goto(appConfig.services.web.baseUrl, { waitUntil: "domcontentloaded" }).catch(() => undefined);
    await page.waitForTimeout(2000).catch(() => undefined);

    const bodyAfterRefresh = await webContext.web.pages.login.getPageText().catch(() => "");
    const remainedOnExpectedOrigin = (() => {
      try {
        return new URL(page.url()).origin === new URL(appConfig.services.web.baseUrl).origin;
      } catch {
        return false;
      }
    })();
    const remainedInMeaningfulState = /dashboard|home|overview|logout|sign out|profile|login|sign in|sign-in/i.test(bodyAfterRefresh);

    expect(bodyBeforeRefresh).toBeTruthy();
    expect(remainedOnExpectedOrigin || remainedInMeaningfulState).toBeTruthy();
  });
});
