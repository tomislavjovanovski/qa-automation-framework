import type { Locator, Page } from "@playwright/test";

import { ROUTES } from "@shared/constants/routes";

import { HeaderComponent } from "../components/header.component";

export class DashboardPage {
  readonly header: HeaderComponent;
  readonly accountSummaryCard: Locator;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.accountSummaryCard = page.getByTestId("dashboard-account-summary");
  }

  async open(): Promise<void> {
    await this.page.goto(ROUTES.dashboard);
  }

  async waitUntilLoaded(): Promise<void> {
    await this.accountSummaryCard.waitFor();
  }
}
