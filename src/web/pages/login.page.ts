import { expect, type Locator, type Page } from "@playwright/test";

import { ROUTES } from "@shared/constants/routes";

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator(
      'input[type="email"], input[name="email"], input[name="username"], input[name="login"], input[id*="email"], input[id*="username"], input[placeholder*="email" i], input[placeholder*="user" i]'
    );

    this.passwordInput = page.locator(
      'input[type="password"], input[name="password"], input[id*="password"], input[placeholder*="password" i]'
    );

    this.signInButton = page.locator(
      'button[type="submit"], input[type="submit"], button:has-text("Sign"), button:has-text("Login"), button:has-text("Log in"), button:has-text("Submit")'
    );
  }

  async open(): Promise<void> {
    await this.page.goto(ROUTES.login, { waitUntil: "domcontentloaded" });
  }

  async signIn(username: string, password: string): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async isLoginFormVisible(): Promise<boolean> {
    return this.usernameInput.isVisible().catch(() => false);
  }

  async getPageText(): Promise<string> {
    return (await this.page.locator("body").textContent()) ?? "";
  }
}