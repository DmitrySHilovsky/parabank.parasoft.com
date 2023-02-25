import { expect, Page } from "@playwright/test";
import { BasePage } from "./base";
import { forEachSeries } from "p-iteration";
import { faker } from "@faker-js/faker";
import { Input } from "../shared/input";

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page, "https://parabank.parasoft.com/parabank/register.htm");
  }

  private LOCATORS = {
    input: (attributeName: string) =>
      this.page.locator(`//input[contains(@id, "${attributeName}")]`),
    errors: (attributeName: string) =>
      this.page.locator(
        `//tr[.//input[contains(@id, "${attributeName}")]]/td/span`
      ),
    registerButton: this.page.locator(`//input[@value="Register"]`),
    successMessage: this.page.locator(
      `//p[text()='Your account was created successfully. You are now logged in.']`
    ),
    welcomeMessageLogin: this.page.locator('//h1[contains(text(),"Welcome")]'),
  };

  private userLogin: string = faker.internet.userName();
  private userPasswor: string = faker.internet.password();

  private correctRegistrationData = [
    { fieldId: "firstName", value: faker.name.firstName() },
    { fieldId: "lastName", value: faker.name.lastName() },
    { fieldId: "address.street", value: faker.address.streetAddress() },
    { fieldId: "address.city", value: faker.address.cityName() },
    { fieldId: "address.state", value: faker.address.state() },
    { fieldId: "address.zipCode", value: faker.address.zipCode() },
    { fieldId: "phoneNumber", value: faker.phone.number("###-###-####") },
    { fieldId: "ssn", value: faker.random.numeric(8) },
    { fieldId: "username", value: this.userLogin },
    { fieldId: "password", value: this.userPasswor },
    { fieldId: "repeatedPassword", value: this.userPasswor },
  ];

  private errorsDataText = [
    { fieldId: "firstName", value: "First name is required." },
    { fieldId: "lastName", value: "Last name is required." },
    { fieldId: "address.street", value: "Address is required." },
    { fieldId: "address.city", value: "City is required." },
    { fieldId: "address.state", value: "State is required." },
    { fieldId: "address.zipCode", value: "Zip Code is required." },
    { fieldId: "phoneNumber", value: "" },
    { fieldId: "ssn", value: "Social Security Number is required." },
    { fieldId: "username", value: "Username is required." },
    { fieldId: "password", value: "Password is required." },
    {
      fieldId: "repeatedPassword",
      value: "Password confirmation is required.",
    },
  ];

  public async fillFormWithValidData() {
    await forEachSeries(this.correctRegistrationData, async (element) => {
      await this.LOCATORS.input(element.fieldId).fill(element.value);
    });
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
    return (await this.LOCATORS.welcomeMessageLogin.innerText()).split(" ").pop();
  }

  public getUserLogin(): string {
    return this.userLogin;
  }

  public async checkErrorText() {
    await forEachSeries(this.errorsDataText, async (element) => {
      if (element.fieldId !== "phoneNumber") {
        const textСurrent = await this.LOCATORS.errors(element.fieldId).innerText();
        const textExpected = element.value;
        expect(textСurrent).toBe(textExpected);
      }
    });
  }
}
