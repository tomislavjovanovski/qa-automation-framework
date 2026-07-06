import type { LoginPage } from "../pages/login.page";
import type { DashboardPage } from "../pages/dashboard.page";

export class LoginFlow {
  constructor(
    private readonly loginPage: LoginPage,
    private readonly dashboardPage: DashboardPage
  ) {}

  async authenticateRetailUser(username: string, password: string): Promise<void> {
    await this.loginPage.open();
    await this.loginPage.signIn(username, password);
    await this.dashboardPage.waitUntilLoaded();
  }
}

