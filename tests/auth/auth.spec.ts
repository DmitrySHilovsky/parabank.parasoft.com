import test, { expect, Page } from "@playwright/test";
import { MainPage } from "../../src/components/pages/main-page";
import { Login } from "../../src/components/shared/login/login";
import { AccountServices } from "../../src/components/shared/account-services/account-services";
import { ERRORS } from "../../src/support/constants";

test.use({ viewport: { width: 1920, height: 1080 } });

test.describe(`Testing the entry positive and negative scenario`, async () => {
  let mainPage: MainPage;
  let login: Login;
  let accountServices: AccountServices;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    mainPage = new MainPage(page);
    await mainPage.visitPage();
    login = new Login(page);
    accountServices = new AccountServices(page);
  });

  test("Login with valid credentials and logout", async () => {
    await login.fillFormValid();
    await login.clickButtonLogIn();

    // определяем что welcomeTitle виден
    expect((await accountServices.isVisibleWelcomeTitle())).toBe(true);

    // Разлогиниваем пользователя

    // Проверяем что пользователь разлогинивается
  });

  test("Login with not valid credentials", async () => { // Разделить на два кейса неправильный логин и неправильный пас
    await login.fillFormNotValid();
    await login.clickButtonLogIn();

    expect((await login.getErrorMessage())).toBe(ERRORS.INVALID_AUTH);
  });
});
