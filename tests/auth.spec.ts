import { test, expect } from "@playwright/test";
import { LoginPage } from "../POMs/loginPage";

test.describe("Auth", () => {
  test("Login s ispravnim podacima", async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto("/login");

    const email = process.env.CORRECT_EMAIL!;
    const password = process.env.CORRECT_PASSWORD!;

    // AUTO-RETRY
    await expect(login.submitButton).toBeEnabled();

    await login.login(email, password);

    // AUTO-RETRY: URL nakon logina (prilagodi rutu svom appu)
    await expect(page).toHaveURL(/dashboard|home|profile/i);
  });

  test("Login s pogrešnim podacima prikazuje grešku", async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto("/login");

    await login.login("wrong@mail.com", "wrong123");

    // AUTO-RETRY: poruka greške (mora postojati lokator u POM-u)
    await login.expectErrorVisible();
  });
});
