import { webTest as test } from "../../../src/shared/fixtures/web.fixture";
import { TEST_TAGS } from "../../../src/shared/constants/test-tags";

// Web specs live in tests/web and describe the user journey.
// The shared fixture injects a webContext that is built from the browser/page layer in src/web/.
test.describe.skip("Retail login journey with API orchestration", () => {
  test(
    `${TEST_TAGS.web} ${TEST_TAGS.happyPath} authenticates user after API setup`,
    async ({ webContext }) => {
      // webContext comes from src/shared/fixtures/web.fixture.ts.
      // In a real scenario, this would be used with page objects or flows from src/web/.
      // API setup data may be created in src/shared/factories or src/api/ and then used by the UI flow.
      void webContext;
    }
  );

  test(`${TEST_TAGS.web} ${TEST_TAGS.negative} blocks invalid credentials`, async ({ webContext }) => {
    // This scenario focuses on the error state seen by the user.
    // The test should pass invalid credentials and verify the UI message returned by the app.
    void webContext;
  });
});
