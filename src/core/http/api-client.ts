import type { APIRequestContext, APIResponse } from "@playwright/test";

import type { AuthStrategy } from "../auth/auth-strategy";
import type { Logger } from "../logging/logger";
import { joinUrl } from "../../shared/utils/url.utils";
import type { RequestOptions } from "./http.types";

export class ApiClient {
  constructor(
    private readonly requestContext: APIRequestContext,
    private readonly baseUrl: string,
    private readonly defaultHeaders: Record<string, string>,
    private readonly authStrategy: AuthStrategy,
    private readonly logger: Logger
  ) {}

  async get(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.execute("GET", path, options);
  }

  async post(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.execute("POST", path, options);
  }

  async put(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.execute("PUT", path, options);
  }

  async delete(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.execute("DELETE", path, options);
  }

  private async execute(method: string, path: string, options: RequestOptions): Promise<APIResponse> {
    const authHeaders = await this.authStrategy.getHeaders();
    const url = joinUrl(this.baseUrl, path);

    this.logger.info("Executing API request", { method, url });

    return this.requestContext.fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        ...this.defaultHeaders,
        ...authHeaders,
        ...options.headers
      },
      params: options.params,
      data: options.data
    });
  }
}
