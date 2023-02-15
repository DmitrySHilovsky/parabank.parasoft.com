import { BasePage } from "./base";
import { Page } from "@playwright/test";

type TypeButton =
  | "firstName"
  | "lastName"
  | "address.street"
  | "address.city"
  | "address.state"
  | "address.zipCode"
  | "phoneNumber"
  | "ssn"
  | "username"
  | "password";

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://parabank.parasoft.com/parabank/register.htm");
  }

  // Локаторы
  private LOCATORS = {
    input: (attributeName: TypeButton) =>
      this.page.locator(`//input[@id="customer.${attributeName}"]`), // Локаторы полей в форме регистрации
    inputPasswordRepeat: this.page.locator(`//input[@id="repeatedPassword"]`),
    registerButton: this.page.locator(`//input[@value="Register"]`), // Локатор кнопки регистрации
  };

  // Заполнение полей в форме регистрации
  // функция хелпер в которую передаём локатор и значение для заполнения, локаторы хранятся в обьекте, обьект перебирается forIn,
  public async fillForm() {
    await this.LOCATORS.input("firstName").fill("testability");
    await this.LOCATORS.input("lastName").fill("Limanv12");
    await this.LOCATORS.input("address.street").fill("testability");
    await this.LOCATORS.input("address.city").fill("testability");
    await this.LOCATORS.input("address.state").fill("testability");
    await this.LOCATORS.input("address.zipCode").fill("testability");
    await this.LOCATORS.input("phoneNumber").fill("testability");
    await this.LOCATORS.input("ssn").fill("testability");
    await this.LOCATORS.input("username").fill("testability");
    await this.LOCATORS.input("password").fill("Limanv12");
    await this.LOCATORS.inputPasswordRepeat.fill("Limanv12");
  }

  public async clickRegistrationButton(): Promise<void> {
    await Promise.all([
      this.LOCATORS.registerButton.click(),
      this.page.waitForLoadState("networkidle"),
    ]);
  }
}

// public fillForm = createFormFiller({
//   firstname: [this.LOCATORS.input('firstname'), 'Mark'],
//   lastname: [this.LOCATORS.input('lastName'), 'Smith'],
//   addressStreet: [this.LOCATORS.input('address.street'), '1 Main St'],
//   addressCity: [this.LOCATORS.input('address.city'), 'New York'],
//   addressState: [this.LOCATORS.input('address.state'), 'NY'],
//   addressZipCode: [this.LOCATORS.input('address.zipCode'), '10001'],
//   phoneNumber: [this.LOCATORS.input('phoneNumber'), '212 555-1234'],
//   ssn: [this.LOCATORS.input('ssn'), '111-11-1111'],
//   username: [this.LOCATORS.input('username'), 'testability'],
//   password: [this.LOCATORS.input('password'), 'Limanv12'],
//   passwordRepeat: [this.LOCATORS.inputPasswordRepeat, 'Limanv12'],
// });

// export declare function createFormFiller<T extends Record<string, [OptimaxLocator, string]>>(fields: T): (values?: Partial<Record<keyof T, string>>) => Promise<void>;
