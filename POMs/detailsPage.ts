import { Page, Locator, expect } from "@playwright/test";

export class DetailsPage {
  readonly page: Page;

  readonly title: Locator;
  readonly gallery: Locator;
  readonly rating: Locator;
  readonly price: Locator;

  readonly roomSelect: Locator; // npr. dropdown ili radio
  readonly reserveButton: Locator; // Reserve / Book now

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByTestId("property-title");
    this.gallery = page.getByTestId("property-gallery");
    this.rating = page.getByTestId("property-rating");
    this.price = page.getByTestId("property-price");

    this.roomSelect = page.getByTestId("room-select"); // ako postoji
    this.reserveButton = page.getByRole("button", {
      name: /reserve|book now|rezerviraj/i,
    });
  }

  async expectDetailsVisible() {
    await expect(this.title).toBeVisible();
    await expect(this.price).toBeVisible();
    // ostalo ovisno o appu:
    // await expect(this.gallery).toBeVisible();
    // await expect(this.rating).toBeVisible();
  }

  async selectRoomIfNeeded(roomOptionValue?: string) {
    // Ako nema odabira sobe u tvojoj aplikaciji, ovu metodu možeš ignorirati.
    if (roomOptionValue) {
      await this.roomSelect.selectOption(roomOptionValue);
    }
  }

  async clickReserve() {
    await this.reserveButton.click();
  }
}
