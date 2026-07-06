import { apiTest as test } from "../../../src/shared/fixtures/api.fixture";
import { TEST_TAGS } from "../../../src/shared/constants/test-tags";

test.describe.skip("Accounts API contract coverage", () => {
  test(`${TEST_TAGS.api} ${TEST_TAGS.happyPath} retrieves account details`, async ({ apiContext }) => {
    void apiContext;
  });

  test(`${TEST_TAGS.api} ${TEST_TAGS.negative} rejects invalid account id`, async ({ apiContext }) => {
    void apiContext;
  });

  test(
    `${TEST_TAGS.api} ${TEST_TAGS.edge} ${TEST_TAGS.idempotency} replays payment safely`,
    async ({ apiContext }) => {
      void apiContext;
    }
  );
});

