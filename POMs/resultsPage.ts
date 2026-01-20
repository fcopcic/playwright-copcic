import { Page, Locator, expect } from "@playwright/test";

export class ResultsPage {
  readonly page: Page;

  // 🔹 Lokatori
  readonly resultCards: Locator;
  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly applyPriceFilterButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.resultCards = page.getByTestId("property-card");

    this.minPriceInput = page.getByTestId("price-min");
    this.maxPriceInput = page.getByTestId("price-max");
    this.applyPriceFilterButton = page.getByRole("button", {
      name: /apply|primijeni|filter/i,
    });
  }

  // 🔹 Metode
  async applyPriceFilter(min: number, max: number) {
    await this.minPriceInput.fill(String(min));
    await this.maxPriceInput.fill(String(max));
    await this.applyPriceFilterButton.click();
  }

  async expectResultsVisible() {
    await expect(this.resultCards.first()).toBeVisible();
  }

  async openFirstResult() {
    await this.resultCards.first().click();
  }
}
