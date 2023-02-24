import { BasePage } from "./base";
import { Page } from "@playwright/test";
import { forEachSeries } from "p-iteration";
import { faker } from "@faker-js/faker"

const correctRegistrationData = [
  { locator: "firstName",       value: faker.name.firstName() },
  { locator: "lastName",        value: faker.name.lastName() },
  { locator: "address.street",  value: faker.address.streetAddress() },
  { locator: "address.city",    value: faker.address.cityName() },
  { locator: "address.state",   value: faker.address.state() },
  { locator: "address.zipCode", value: faker.address.zipCode() },
  { locator: "phoneNumber",     value: faker.phone.number() },
  { locator: "ssn",             value: faker.random.numeric(8) },
  { locator: "username",        value: faker.internet.userName() },
  { locator: "password",        value: faker.internet.password() },
]

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://parabank.parasoft.com/parabank/register.htm");
  }

  private LOCATORS = {
    input: (attributeName: string) =>
      this.page.locator(`//input[@id="customer.${attributeName}"]`), 
    inputPasswordRepeat: this.page.locator(`//input[@id="repeatedPassword"]`),
    registerButton: this.page.locator(`//input[@value="Register"]`), 
    successMessage: this.page.locator(`//p[text()='Your account was created successfully. You are now logged in.']`), 
  };

  public async fillForm() {
    await forEachSeries (correctRegistrationData, async (element, index) => {
      await this.LOCATORS.input(element.locator).fill(element.value);
    });

    const index = correctRegistrationData.findIndex(item => item.locator === "password");
    await this.LOCATORS.inputPasswordRepeat.fill(correctRegistrationData[index].value); 
  }

  public async clickRegistrationButton(): Promise<void> {
    await Promise.all([
      this.LOCATORS.registerButton.click(),
      this.page.waitForLoadState("networkidle"),
    ]);
  }

  public async getSuccessMessage():Promise<string> {
    return (await this.LOCATORS.successMessage.innerText()).trim();
  }
}
