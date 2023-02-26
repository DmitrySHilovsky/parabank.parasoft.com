import test, { expect } from "@playwright/test";
import { MainPage } from "../../src/components/pages/main-page";

test.use({ viewport: { width: 1920, height: 1080 } });

test.describe.configure({ mode: "serial" }); // Каждый тест запустится после предыдущего теста, и в его контексте

// Заходим на сайт и сверяем тайтл
test.describe(`Metadata details on main page`, async () => {
  let mainPage: MainPage;

  // Этот блок выполняется перед каждым тестом
  // Заходим на сайт - поскольку URL не указан, то используется DefaultURL из констант
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    mainPage = new MainPage(page);

    await mainPage.visitPage();
  });
  // Сверяем тайтл с ожидаемым
  test("Page title should be correctly", async () => {
    const title = await mainPage.getTitle();
    await mainPage.Header.clickLogoCompany();
    await mainPage.Header.clickLogoAdmin();
    
    expect(title).toBe("ParaBank | Welcome | Online Banking");
  });
});
