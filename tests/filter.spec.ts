import { test, expect } from "@playwright/test";
import { SearchPage } from "../POMs/searchPage";
import { ResultsPage } from "../POMs/resultsPage";

test("Filtriranje rezultata po cijeni", async ({ page }) => {
  const search = new SearchPage(page);
  const results = new ResultsPage(page);

  await search.goto();

  // ✅ AUTO-RETRY: button postoji i aktivan je
  await expect(search.searchButton).toBeEnabled();

  await search.search("Zagreb", "2026-02-01", "2026-02-05");

  // ✅ AUTO-RETRY: URL je ispravan
  await expect(page).toHaveURL(/search|results/i);

  // ✅ AUTO-RETRY: elementi postoje
  await expect(results.minPriceInput).toBeVisible();
  await expect(results.maxPriceInput).toBeVisible();

  // ✅ AUTO-RETRY: button aktivan
  await expect(results.applyPriceFilterButton).toBeEnabled();

  await results.applyPriceFilter(50, 150);

  // ✅ AUTO-RETRY: rezultat se prikazuje
  await expect(results.resultCards.first()).toBeVisible();
});
