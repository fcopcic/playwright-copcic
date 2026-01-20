import { test, expect } from "@playwright/test";
import { BookingPage } from "../POMs/bookingPage";

test("Validacija forme za rezervaciju", async ({ page }) => {
  const booking = new BookingPage(page);

  await expect(booking.confirmBookingButton).toBeVisible();

  // bez unosa podataka
  await booking.confirmBooking();

  // AUTO-RETRY asertacija
  await booking.expectValidationError();

  await expect(page).toHaveURL(/booking|checkout/i);
});
