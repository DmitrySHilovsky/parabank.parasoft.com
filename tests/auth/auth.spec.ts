import test, { expect, Page } from "@playwright/test";
import { MainPage } from "../../src/components/pages/main-page";
import { Login } from "../../src/components/shared/login/login";
import { AccountServices } from "../../src/components/shared/account-services/account-services";
import { ERRORS } from "../../src/support/constants";

test.use({ viewport: { width: 1920, height: 1080 } });

// Тесты связаные с логированием юзера 
// Нужно не забыть что тесты запускаются в отдельных окнах, и контекст не сохраняется
// Позитивные: валидный логин, разлогинивание прошло успешно
// Негативные: невалидный логин и пароль, ЗАДАЧА разделить кейсы на две части
test.describe(`Testing the entry positive and negative scenario`, async () => {
  let mainPage: MainPage;
  let accountServices: AccountServices;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    mainPage = new MainPage(page);
    await mainPage.visitPage();
    accountServices = new AccountServices(page);
  });

  test("Login with valid credentials and logout", async () => {
    await mainPage.LeftPanel.login.fillFormValid();    //Заполняем форму валидными данными
    await mainPage.LeftPanel.login.clickButtonLogIn(); //Нажимаем кнопку входа, дожидаемся загрузки страницы

    // определяем что welcomeTitle виден
    expect((await accountServices.isVisibleWelcomeTitle())).toBe(true);

    // ЗАДАЧА Разлогиниваем пользователя

    // ЗАДАЧА Проверяем что пользователь разлогинивается
  });
  // ЗАДАЧА Разделить на два кейса неправильный логин и неправильный пас
  test("Login with incorrect login and correct password", async () => { 
    await mainPage.LeftPanel.login.fillFormNotValid();
    await mainPage.LeftPanel.login.clickButtonLogIn();

    // проверка текст ошибки ЗАДАЧА необходимо все ошибки занести в константы
    expect((await mainPage.LeftPanel.login.getErrorMessage())).toBe(ERRORS.INVALID_AUTH);
  });
});
