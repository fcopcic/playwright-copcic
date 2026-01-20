import { test, expect } from "@playwright/test";
import { DetailsPage } from "../POMs/detailsPage";
import { BookingPage } from "../POMs/bookingPage";

test("Rezervacija smještaja", async ({ page }) => {
  const details = new DetailsPage(page);
  const booking = new BookingPage(page);

  await expect(details.reserveButton).toBeVisible();
  await details.clickReserve();

  await expect(page).toHaveURL(/booking|checkout/i);

  await booking.fillGuestData({
    firstName: "Test",
    lastName: "User",
    email: "test@mail.com",
    phone: "0912345678",
  });

  await expect(booking.confirmBookingButton).toBeEnabled();
  await booking.confirmBooking();

  await booking.expectBookingSuccess();
});
