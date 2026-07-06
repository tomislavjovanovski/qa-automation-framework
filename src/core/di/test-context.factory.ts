import type { APIRequestContext, Page } from "@playwright/test";

import { AccountsApiFacade } from "@api/modules/accounts/accounts.api.facade";
import { AuthStrategyFactory } from "@core/auth/auth-strategy.factory";
import type { AppConfig } from "@core/config/types/app-config";
import { ApiClient } from "@core/http/api-client";
import { ConsoleLogger } from "@core/logging/logger";
import { CustomerFactory } from "@shared/factories/customer.factory";
import type { ApiTestContext, WebTestContext } from "@shared/types/test-context.types";
import { NavigationActions } from "@web/actions/navigation.actions";
import { LoginFlow } from "@web/flows/login.flow";
import { DashboardPage } from "@web/pages/dashboard.page";
import { LoginPage } from "@web/pages/login.page";

export class TestContextFactory {
  static createApiContext(dependencies: {
    request: APIRequestContext;
    appConfig: AppConfig;
  }): ApiTestContext {
    const logger = new ConsoleLogger();
    const authStrategy = AuthStrategyFactory.create(dependencies.appConfig);
    const apiClient = new ApiClient(
      dependencies.request,
      dependencies.appConfig.services.api.baseUrl,
      dependencies.appConfig.services.api.defaultHeaders,
      authStrategy,
      logger
    );

    return {
      config: dependencies.appConfig,
      api: {
        accounts: new AccountsApiFacade(apiClient)
      },
      data: {
        customerFactory: new CustomerFactory()
      }
    };
  }

  static createWebContext(dependencies: {
    request: APIRequestContext;
    page: Page;
    appConfig: AppConfig;
  }): WebTestContext {
    const apiContext = this.createApiContext({
      request: dependencies.request,
      appConfig: dependencies.appConfig
    });
    const loginPage = new LoginPage(dependencies.page);
    const dashboardPage = new DashboardPage(dependencies.page);

    return {
      ...apiContext,
      web: {
        pages: {
          login: loginPage,
          dashboard: dashboardPage
        },
        components: {
          header: dashboardPage.header
        },
        flows: {
          login: new LoginFlow(loginPage, dashboardPage)
        },
        actions: {
          navigation: new NavigationActions(dependencies.page)
        }
      }
    };
  }
}
