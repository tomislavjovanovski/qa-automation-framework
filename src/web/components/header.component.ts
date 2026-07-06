import type { Locator, Page } from "@playwright/test";

export class HeaderComponent {
  readonly profileMenuButton: Locator;
  readonly signOutButton: Locator;

  constructor(private readonly page: Page) {
    this.profileMenuButton = page.getByTestId("header-profile-menu");
    this.signOutButton = page.getByTestId("header-sign-out");
  }

  async signOut(): Promise<void> {
    await this.profileMenuButton.click();
    await this.signOutButton.click();
  }
}

