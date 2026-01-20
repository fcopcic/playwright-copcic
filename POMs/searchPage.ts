import { Page, Locator } from "@playwright/test";

export class SearchPage {
  readonly page: Page;

  readonly destinationInput: Locator;
  readonly checkInInput: Locator;
  readonly checkOutInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.destinationInput = page.getByTestId("destination-input"); // unique
    this.checkInInput = page.getByTestId("checkin-input"); // unique
    this.checkOutInput = page.getByTestId("checkout-input"); // unique
    this.searchButton = page.getByRole("button", {
      name: /search|traži|pretraži/i,
    });
  }

  async goto() {
    await this.page.goto("/");
  }

  async search(destination: string, checkIn: string, checkOut: string) {
    await this.destinationInput.fill(destination);

    // Ako koristiš date picker, možda neće biti fill() nego click + odabir datuma.
    // Ovo je najjednostavniji stabilan pattern ako su inputi tekstualni.
    await this.checkInInput.fill(checkIn); // npr. "2026-02-01"
    await this.checkOutInput.fill(checkOut); // npr. "2026-02-05"

    await this.searchButton.click();
  }
}
