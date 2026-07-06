import type { Page } from "@playwright/test";

export class NavigationActions {
  constructor(private readonly page: Page) {}

  async open(relativePath: string): Promise<void> {
    await this.page.goto(relativePath.replace(/^\/+/, ""));
  }
}
