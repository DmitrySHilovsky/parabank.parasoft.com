import { Component } from "../../pom/component/component";

type TypeAttributeName = "username" | "password";

export class Login extends Component {
  private userData = this.readUserData();

  private LOCATORS = {
    login: this.locator,
    input: (attributeName: TypeAttributeName) =>
      this.locator.locator(`//input[@name='${attributeName}']`),
    buttonLogIn: this.locator.locator(
      '//input[@type="submit" and @value="Log In"]'
    ),
    linkRegistration: this.locator.locator(
      '//div[@id="loginPanel"]//a[text()="Forgot login info?"]'
    ),
    linkRecovery: this.locator.locator('//a[text()="Forgot login info?"]'),
    errorMessage: this.page.locator('//div[@id="rightPanel"]/p[@class="error"]'),
  };

  public async clickButtonLogIn(): Promise<void> {
     await Promise.all([
    this.LOCATORS.buttonLogIn.click(),
    this.page.waitForLoadState("networkidle"),
    ]);
  }

  public async fillFormValid(): Promise<void> {
    await this.LOCATORS.input("username").fill(this.userData.name);
    await this.LOCATORS.input("password").fill(this.userData.password);
  }

  public async fillFormNotValid(): Promise<void> {
    await this.LOCATORS.input("username").fill("testilityqwe");
    await this.LOCATORS.input("password").fill("Limanv12");
  }

  public async getErrorMessage(): Promise<string> {
    return (await this.LOCATORS.errorMessage.innerText()).trim();
  }

  // Чтение данных из файла json
  public readUserData() {
    const fs = require('fs');
    let rawData = fs.readFileSync('data.json');
    let data = JSON.parse(rawData);
    return data;
  }
}


