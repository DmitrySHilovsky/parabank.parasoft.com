import { Page } from "@playwright/test";
import { BasePage } from "./base";
import { forEachSeries } from "p-iteration";
import { faker } from "@faker-js/faker";
import { Container } from "../pom/container/container";

export class RegistrationPage extends Container {
  constructor(page: Page) {
    super(page, "https://parabank.parasoft.com/parabank/register.htm");
  }

  private LOCATORS = {
    input: (attributeName: string) =>
      this.page.locator(`//input[@id="customer.${attributeName}"]`),
    inputPasswordRepeat: this.page.locator(`//input[@id="repeatedPassword"]`),
    registerButton: this.page.locator(`//input[@value="Register"]`),
    successMessage: this.page.locator(
      `//p[text()='Your account was created successfully. You are now logged in.']`
    ),
    welcomeMessageLogin: this.page.locator('//h1[contains(text(),"Welcome")]'),
  };

  private userLogin: string = faker.internet.userName();
  private userPassword: string = faker.internet.password();

  private correctRegistrationData = [
    { locator: "firstName", value: faker.name.firstName() },
    { locator: "lastName", value: faker.name.lastName() },
    { locator: "address.street", value: faker.address.streetAddress() },
    { locator: "address.city", value: faker.address.cityName() },
    { locator: "address.state", value: faker.address.state() },
    { locator: "address.zipCode", value: faker.address.zipCode() },
    { locator: "phoneNumber", value: faker.phone.number('###-###-####') },
    { locator: "ssn", value: faker.random.numeric(8) },
    { locator: "username", value: this.userLogin },
    { locator: "password", value: this.userPassword },
  ];

  public async fillForm() {
    await forEachSeries(this.correctRegistrationData, async (element) => {
      await this.LOCATORS.input(element.locator).fill(element.value);
    });

    const index = this.correctRegistrationData.findIndex(
      (item) => item.locator === "password"
    );
    await this.LOCATORS.inputPasswordRepeat.fill(
      this.correctRegistrationData[index].value
    );
  }

  public async clickRegistrationButton(): Promise<void> {
    await Promise.all([
      this.LOCATORS.registerButton.click(),
      this.page.waitForLoadState("networkidle"),
    ]);
  }

  public async getSuccessMessage(): Promise<string> {
    return (await this.LOCATORS.successMessage.innerText()).trim();
  }

  public async getLoginFromWelcomeMessage(): Promise<string | undefined> {
    return (await this.LOCATORS.welcomeMessageLogin.innerText())
      .split(" ")
      .pop();
  }

  public getUserLogin(): string {
    return this.userLogin;
  }

  // Сохранение данных в файл json
  public saveUserData() {
    const fs = require('fs');
    let name = this.userLogin;
    let password = this.userPassword;
    let data = { name, password };
    fs.writeFileSync('data.json', JSON.stringify(data));
  }
}
