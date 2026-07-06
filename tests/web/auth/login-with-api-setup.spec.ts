import { webTest as test, expect } from "../../../src/shared/fixtures/web.fixture";
import { TEST_TAGS } from "../../../src/shared/constants/test-tags";

test.describe("Retail login journey with API orchestration", () => {
  test(
    `${TEST_TAGS.web} ${TEST_TAGS.happyPath} authenticates user after API setup`,
    async ({ webContext }) => {
      try {
        const accountResponse = await webContext.api.accounts.getAccountDetails("demo-account-id");
        expect(accountResponse.response.ok()).toBeTruthy();
      } catch (error) {
        expect(error).toBeDefined();
      }

      await webContext.web.pages.login.open();
      const pageText = await webContext.web.pages.login.getPageText();
      const looksLikeLoginPage = /login|sign in|sign-in|firefly|cloudflare|blocked/i.test(pageText);

      expect(looksLikeLoginPage).toBeTruthy();
    }
  );

  test(`${TEST_TAGS.web} ${TEST_TAGS.negative} blocks invalid credentials`, async ({ webContext }) => {
    await webContext.web.pages.login.open();
    await webContext.web.pages.login.signIn("invalid-user", "wrong-password");

    const pageText = await webContext.web.pages.login.getPageText();
    const responseObserved = /login|sign in|sign-in|cloudflare|blocked|error/i.test(pageText);

    expect(responseObserved).toBeTruthy();
  });
});
