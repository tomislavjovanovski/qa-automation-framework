import type { AccountsApiFacade } from "@api/modules/accounts/accounts.api.facade";
import type { AppConfig } from "@core/config/types/app-config";
import type { CustomerFactory } from "@shared/factories/customer.factory";
import type { HeaderComponent } from "@web/components/header.component";
import type { NavigationActions } from "@web/actions/navigation.actions";
import type { LoginFlow } from "@web/flows/login.flow";
import type { DashboardPage } from "@web/pages/dashboard.page";
import type { LoginPage } from "@web/pages/login.page";

export interface ApiModuleRegistry {
  accounts: AccountsApiFacade;
}

export interface DataFactoryRegistry {
  customerFactory: CustomerFactory;
}

export interface WebRegistry {
  pages: {
    login: LoginPage;
    dashboard: DashboardPage;
  };
  components: {
    header: HeaderComponent;
  };
  flows: {
    login: LoginFlow;
  };
  actions: {
    navigation: NavigationActions;
  };
}

export interface ApiTestContext {
  config: AppConfig;
  api: ApiModuleRegistry;
  data: DataFactoryRegistry;
}

export interface WebTestContext extends ApiTestContext {
  web: WebRegistry;
}

