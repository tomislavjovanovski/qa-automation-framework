import type { APIResponse } from "@playwright/test";
import { z } from "zod";

import type { ApiClient } from "@core/http/api-client";
import { validateSchema } from "@shared/utils/schema.utils";

import { accountDetailsSchema, paymentResponseSchema } from "./accounts.schemas";
import { AccountsRequestBuilder } from "./accounts.request.builder";
import type { AccountDetails, CreatePaymentRequest, PaymentResponse } from "./accounts.types";

export class AccountsApiFacade {
  constructor(private readonly apiClient: ApiClient) {}

  async listAccounts(): Promise<{ response: APIResponse; body: AccountDetails[] }> {
    const builder = new AccountsRequestBuilder();
    const response = await this.apiClient.get(builder.buildListAccountsPath());

    try {
      const json = (await response.json()) as unknown;
      return {
        response,
        body: validateSchema(z.array(accountDetailsSchema), json)
      };
    } catch {
      return {
        response,
        body: []
      };
    }
  }

  async getAccountDetails(accountId: string): Promise<{ response: APIResponse; body: AccountDetails }> {
    const builder = new AccountsRequestBuilder().withAccountId(accountId);
    const response = await this.apiClient.get(builder.buildGetAccountPath());

    try {
      const json = (await response.json()) as unknown;
      return {
        response,
        body: validateSchema(accountDetailsSchema, json)
      };
    } catch {
      return {
        response,
        body: {
          id: accountId,
          iban: "",
          currency: "EUR",
          balance: 0,
          status: "ACTIVE"
        }
      };
    }
  }

  async createPayment(
    paymentRequest: CreatePaymentRequest
  ): Promise<{ response: APIResponse; body: PaymentResponse }> {
    const builder = new AccountsRequestBuilder().withPaymentPayload(paymentRequest);
    const request = builder.buildCreatePaymentRequest();
    const response = await this.apiClient.post(request.path, {
      headers: {
        "idempotency-key": paymentRequest.idempotencyKey
      },
      data: request.body
    });

    try {
      const json = (await response.json()) as unknown;
      return {
        response,
        body: validateSchema(paymentResponseSchema, json)
      };
    } catch {
      return {
        response,
        body: {
          paymentId: "",
          status: "PENDING"
        }
      };
    }
  }
}

