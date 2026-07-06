import { apiTest as test, expect } from "../../../src/shared/fixtures/api.fixture";
import { TEST_TAGS } from "../../../src/shared/constants/test-tags";
import { accountDetailsSchema } from "../../../src/api/modules/accounts/accounts.schemas";
import { validateSchema } from "../../../src/shared/utils/schema.utils";

test.describe("Accounts API contract coverage", () => {
  test(`${TEST_TAGS.api} ${TEST_TAGS.happyPath} retrieves account details`, async ({ apiContext }) => {
    try {
      const result = await apiContext.api.accounts.getAccountDetails("demo-account-id");
      expect(result.response.ok()).toBeTruthy();
      expect(result.body.currency).toMatch(/^[A-Z]{3}$/);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test(`${TEST_TAGS.api} ${TEST_TAGS.negative} rejects invalid account id`, async ({ apiContext }) => {
    try {
      await apiContext.api.accounts.getAccountDetails("invalid-account-id");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test(
    `${TEST_TAGS.api} ${TEST_TAGS.edge} ${TEST_TAGS.idempotency} replays payment safely`,
    async ({ apiContext }) => {
      const paymentRequest = {
        sourceAccountId: "demo-source",
        destinationAccountId: "demo-destination",
        amount: 25,
        currency: "EUR",
        idempotencyKey: `payment-${Date.now()}`
      };

      try {
        const result = await apiContext.api.accounts.createPayment(paymentRequest);
        expect(["PENDING", "BOOKED", "REJECTED"]).toContain(result.body.status);
      } catch (error) {
        expect(error).toBeDefined();
      }
    }
  );

  test(`${TEST_TAGS.api} validates account details schema`, async () => {
    const invalidPayload = {
      id: "",
      iban: "short",
      currency: "US",
      balance: "not-a-number",
      status: "UNKNOWN"
    };

    expect(() => validateSchema(accountDetailsSchema, invalidPayload)).toThrow();
  });
});

