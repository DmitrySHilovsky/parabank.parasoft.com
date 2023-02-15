import test, { expect, Page } from "@playwright/test";
import { MainPage } from "../../src/components/pages/main-page";

test.use({ viewport: { width: 1920, height: 1080 } });

test.describe.configure({ mode: "serial" });

test.describe(`Metadata details on main page`, async () => {
  let mainPage: MainPage;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    mainPage = new MainPage(page);
    await mainPage.visitPage();
  });

  test("Page title should be correctly", async () => {
    const title = await mainPage.getTitle();

    expect(title).toBe("ParaBank | Welcome | Online Banking");

    await mainPage.Header.RightSideNavigation.clickButton("home");
    await mainPage.Header.LeftSideNavigation.clickButton("Admin Page");
    await mainPage.Header.LeftSideNavigation.clickButton("About Us");
  });
});
