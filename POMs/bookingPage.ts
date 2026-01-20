import { Page, Locator, expect } from "@playwright/test";

export class BookingPage {
  readonly page: Page;

  // Forma
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;

  readonly confirmBookingButton: Locator;

  // Poruke
  readonly successMessage: Locator;
  readonly formErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByTestId("booking-first-name");
    this.lastNameInput = page.getByTestId("booking-last-name");
    this.emailInput = page.getByTestId("booking-email");
    this.phoneInput = page.getByTestId("booking-phone");

    this.confirmBookingButton = page.getByRole("button", {
      name: /confirm|book|potvrdi|rezerviraj/i,
    });

    this.successMessage = page.getByTestId("booking-success");
    this.formErrorMessage = page.getByTestId("booking-error");
  }

  async fillGuestData(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);

    if (data.phone) {
      await this.phoneInput.fill(data.phone);
    }
  }

  async confirmBooking() {
    await this.confirmBookingButton.click();
  }

  async expectBookingSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async expectValidationError() {
    await expect(this.formErrorMessage).toBeVisible();
    // opcionalno: gumb treba biti disabled ili da forma ne prolazi
    // await expect(this.confirmBookingButton).toBeDisabled();
  }
}
