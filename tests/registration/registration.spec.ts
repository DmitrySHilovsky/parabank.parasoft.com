import test, { expect, Page } from "@playwright/test";
import { RegistrationPage } from "../../src/components/pages/registration-page";

test.use({ viewport: { width: 1920, height: 1080 } });

test.describe.only(`Testing the entry positive and negative scenario`, async () => {
  let registrationPage: RegistrationPage;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    registrationPage = new RegistrationPage(page);

    await registrationPage.visitPage();
  });

  test("Create new User", async () => {
    await registrationPage.fillForm();
    await registrationPage.clickRegistrationButton();
  });

  // Оставить поля пустыми и кликнуть на кнопку регистрация, убедится что выдало ошибки и пользователь не зарегистрирован
});
