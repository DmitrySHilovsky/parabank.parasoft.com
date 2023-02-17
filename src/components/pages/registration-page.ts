import { BasePage } from "./base";
import { Page } from "@playwright/test";
import { forEachSeries } from "p-iteration";

// ??? может быть перенести в отдельный файл названия атрибутов и тест данные?
// Названия атрибутов для локатор (xpath)
const objectAtributeNaimen = {
  firstName: "firstName",
  lastName: "lastName",
  street: "address.street",
  city: "address.city",
  state: "address.state",
  zipCode: "address.zipCode",
  phoneNumber: "phoneNumber",
  ssn: "ssn",
  username: "username",
  password: "password",
};

// Тестовые данные для регистрации
const objectfillFormValues = {
  firstName: "Ivan",
  lastName: "Dzenev",
  street: "Mira st. 132-105",
  city: "Moscow",
  state: "RussiaMother",
  zipCode: "784632575",
  phoneNumber: "8-800-555-35-35",
  ssn: "784254927",
  username: "testability",
  password: "Limanv12",
};

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://parabank.parasoft.com/parabank/register.htm");
  }

  // Локаторы
  private LOCATORS = {
    input: (attributeName: string) =>
      this.page.locator(`//input[@id="customer.${attributeName}"]`), // Локаторы полей в форме регистрации
    inputPasswordRepeat: this.page.locator(`//input[@id="repeatedPassword"]`),
    registerButton: this.page.locator(`//input[@value="Register"]`), // Локатор кнопки регистрации
    SuccessMessage: this.page.locator(`?????????????????`), // Локатор сообщения об успешной регистрации
  };

  // ЗАДАНИЕ перенести в отдельный файл
  // Заполнение полей в форме регистрации
  // функция хелпер в которую передаём локатор и значение для заполнения, локаторы хранятся в обьекте, обьект перебирается forEachSeries,
  public async fillForm() {
    const attributeNameValues = Object.values(objectAtributeNaimen); // переводим обьект в массив значений имен атрибутов
    const fillFormValues = Object.values(objectfillFormValues); // переводим обьект в массив значений имен атрибутов

    await forEachSeries (attributeNameValues, async (element, index) => {
      await this.LOCATORS.input(element).fill(fillFormValues[index]);
      })
    await this.LOCATORS.inputPasswordRepeat.fill("Limanv12");
  }

  public async fillFormEmpty() {
    
  }

  public async clickRegistrationButton(): Promise<void> {
    await Promise.all([
      this.LOCATORS.registerButton.click(),
      this.page.waitForLoadState("networkidle"),
    ]);
  }
}
