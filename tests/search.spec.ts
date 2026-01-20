import { test, expect } from "@playwright/test";
import { SearchPage } from "../POMs/searchPage";
import { ResultsPage } from "../POMs/resultsPage";

test("Pretraga smještaja po lokaciji i datumu", async ({ page }) => {
  const search = new SearchPage(page);
  const results = new ResultsPage(page);

  await search.goto();

  // AUTO-RETRY asertacije
  await expect(search.destinationInput).toBeVisible();
  await expect(search.searchButton).toBeEnabled();

  await search.search("Zagreb", "2026-02-01", "2026-02-05");

  await expect(page).toHaveURL(/search|results/i);
  await results.expectResultsVisible();
});
