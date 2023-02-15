import type { Page } from "@playwright/test";

type TypeButton = "home" | "about" | "contact";

export class RightSideNavigation {
  constructor(readonly page: Page) {
    this.page = page;
  }

  private LOCATORS = {
    button: (text: TypeButton) => this.page.locator(`//a[text()="${text}"]`),
  };

  public async clickButton(typeButton: TypeButton): Promise<void> {
    await this.LOCATORS.button(typeButton).click();
  }
}
