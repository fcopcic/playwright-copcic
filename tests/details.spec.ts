import { test, expect } from "@playwright/test";
import { SearchPage } from "../POMs/searchPage";
import { ResultsPage } from "../POMs/resultsPage";
import { DetailsPage } from "../POMs/detailsPage";

test("Pregled detalja smještaja", async ({ page }) => {
  const search = new SearchPage(page);
  const results = new ResultsPage(page);
  const details = new DetailsPage(page);

  await search.goto();
  await search.search("Zagreb", "2026-02-01", "2026-02-05");

  await expect(results.resultCards.first()).toBeVisible();
  await results.openFirstResult();

  await expect(page).toHaveURL(/details|property/i);
  await details.expectDetailsVisible();
});
