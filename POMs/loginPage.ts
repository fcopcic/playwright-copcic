import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  // Unique / stable lokatori (prefer data-testid / role / label)
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByTestId("login-email"); // npr. <input data-testid="login-email" />
    this.passwordInput = page.getByTestId("login-password"); // npr. <input data-testid="login-password" />
    this.submitButton = page.getByRole("button", {
      name: /login|sign in|prijava/i,
    });
    this.errorMessage = page.getByTestId("login-error"); // opcionalno
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectErrorVisible() {
    await expect(this.errorMessage).toBeVisible();
  }
}
