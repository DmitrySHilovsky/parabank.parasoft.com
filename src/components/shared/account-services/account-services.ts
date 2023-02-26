import { Page } from "@playwright/test";

// Названия кнопок - необходимо для Xpath
type TypeButton =
  | "Open New Account"
  | "Accounts Overview"
  | "Transfer Funds"
  | "Bill Pay"
  | "Find Transactions"
  | "Update Contact Info"
  | "Request Loan"
  | "Log Out";

export class AccountServices {
  constructor(readonly page: Page) {
    this.page = page;
  }
  // Локаторы на менюшке слева
  private LOCATORS = {
    button: (text: TypeButton) => this.page.locator(`//a[text()="${text}"]`), // Кнопки в менюшке слева
    welcomeTitle: this.page.locator('//div[@id="leftPanel"]//b["Welcome"]'),  // Приветственный текст в менюшке слева над кнопками
  }

  // Клик на кнопку LogIn
  public async clickButton(typeButton: TypeButton): Promise<void> {
    await this.LOCATORS.button(typeButton).click();
  }

  // Видимость приветсвия после логина
  public async isVisibleWelcomeTitle(): Promise<boolean> {
    return await this.LOCATORS.welcomeTitle.isVisible();
  }
}
