import { webTest as test } from "../../../src/shared/fixtures/web.fixture";
import { TEST_TAGS } from "../../../src/shared/constants/test-tags";

test.describe.skip("Retail login journey with API orchestration", () => {
  test(
    `${TEST_TAGS.web} ${TEST_TAGS.happyPath} authenticates user after API setup`,
    async ({ webContext }) => {
      void webContext;
    }
  );

  test(`${TEST_TAGS.web} ${TEST_TAGS.negative} blocks invalid credentials`, async ({ webContext }) => {
    void webContext;
  });
});
