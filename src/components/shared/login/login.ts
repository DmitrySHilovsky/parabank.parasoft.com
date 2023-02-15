import type { Page } from "@playwright/test";
import { timeout } from "../../../support/utils";

type TypeAttributeName = "username" | "password";

export class Login {
  constructor(readonly page: Page) {
    this.page = page;
  }

  private LOCATORS = {
    input: (attributeName: TypeAttributeName) =>
      this.page.locator(`//input[@name='${attributeName}']`),
    buttonLogIn: this.page.locator(
      '//input[@type="submit" and @value="Log In"]'
    ),
    linkRegistration: this.page.locator(
      '//div[@id="loginPanel"]//a[text()="Forgot login info?"]'
    ), // используем атрибут в xpath  альтернатива //div[contains(@id, "body")]/div[h2]
    linkRecovery: this.page.locator('//a[text()="Forgot login info?"]'),
    errorMessage: this.page.locator('//div[@id="rightPanel"]/p[@class="error"]'),
  };

  public async clickButtonLogIn(): Promise<void> {
    await Promise.all([
      this.LOCATORS.buttonLogIn.click(),
      this.page.waitForLoadState("networkidle"),
    ]);
  }

  public async fillFormValid(): Promise<void> {
    await this.LOCATORS.input("username").fill("testability");
    await this.LOCATORS.input("password").fill("Limanv12");
  }

  public async fillFormNotValid(): Promise<void> {
    await this.LOCATORS.input("username").fill("testilityqwe");
    await this.LOCATORS.input("password").fill("Limanv12");
  }

  public async getErrorMessage(): Promise<string> {
    return (await this.LOCATORS.errorMessage.innerText()).trim();
  }
}


