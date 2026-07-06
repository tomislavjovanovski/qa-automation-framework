import type { Locator, Page } from "@playwright/test";

import { ROUTES } from "@shared/constants/routes";

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByTestId("login-username");
    this.passwordInput = page.getByTestId("login-password");
    this.signInButton = page.getByTestId("login-submit");
  }

  async open(): Promise<void> {
    await this.page.goto(ROUTES.login);
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
