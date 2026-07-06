import type { CreatePaymentRequest } from "./accounts.types";

export class AccountsRequestBuilder {
  private accountId = "demo-account-id";
  private paymentPayload: CreatePaymentRequest = {
    sourceAccountId: "source-account-id",
    destinationAccountId: "destination-account-id",
    amount: 10,
    currency: "EUR",
    idempotencyKey: "default-idempotency-key"
  };

  withAccountId(accountId: string): this {
    this.accountId = accountId;
    return this;
  }

  withPaymentPayload(payload: Partial<CreatePaymentRequest>): this {
    this.paymentPayload = {
      ...this.paymentPayload,
      ...payload
    };

    return this;
  }

  buildListAccountsPath(): string {
    return "/v1/accounts";
  }

  buildGetAccountPath(): string {
    return `/v1/accounts/${this.accountId}`;
  }

  buildCreatePaymentRequest(): { path: string; body: CreatePaymentRequest } {
    return {
      path: `/v1/accounts/${this.paymentPayload.sourceAccountId}/payments`,
      body: this.paymentPayload
    };
  }
}

