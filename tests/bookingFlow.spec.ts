import { test, expect } from "@playwright/test";
import { SearchPage } from "../POMs/searchPage";
import { ResultsPage } from "../POMs/resultsPage";
import { DetailsPage } from "../POMs/detailsPage";
import { BookingPage } from "../POMs/bookingPage";

test.describe("Booking flow", () => {
  test("Pretraga smještaja po lokaciji i datumu", async ({ page }) => {
    const search = new SearchPage(page);
    const results = new ResultsPage(page);

    await search.goto();

    // AUTO-RETRY
    await expect(search.searchButton).toBeEnabled();

    await search.search("Zagreb", "2026-02-01", "2026-02-05");

    // AUTO-RETRY
    await expect(page).toHaveURL(/search|results/i);
    await results.expectResultsVisible();
  });

  test("Filtriranje rezultata po cijeni", async ({ page }) => {
    const search = new SearchPage(page);
    const results = new ResultsPage(page);

    await search.goto();
    await search.search("Zagreb", "2026-02-01", "2026-02-05");

    // AUTO-RETRY
    await expect(results.minPriceInput).toBeVisible();
    await expect(results.maxPriceInput).toBeVisible();
    await expect(results.applyPriceFilterButton).toBeEnabled();

    await results.applyPriceFilter(50, 150);

    // AUTO-RETRY
    await expect(results.resultCards.first()).toBeVisible();
  });

  test("Pregled detalja smještaja i prelazak na rezervaciju", async ({
    page,
  }) => {
    const search = new SearchPage(page);
    const results = new ResultsPage(page);
    const details = new DetailsPage(page);
    const booking = new BookingPage(page);

    await search.goto();
    await search.search("Zagreb", "2026-02-01", "2026-02-05");

    // AUTO-RETRY
    await expect(results.resultCards.first()).toBeVisible();
    await results.openFirstResult();

    // AUTO-RETRY
    await expect(page).toHaveURL(/details|property/i);
    await details.expectDetailsVisible();
    await expect(details.reserveButton).toBeEnabled();

    await details.clickReserve();

    // AUTO-RETRY (booking stranica/forma)
    await expect(page).toHaveURL(/booking|checkout|reserve/i);
    await expect(booking.firstNameInput).toBeVisible();
  });
});
