import type { Page } from "@playwright/test";

type TypeButton = "About Us" | "Services" | "Products" | "Locations" | "Admin Page";

export class LeftSideNavigation {
    constructor(readonly page: Page) {
      this.page = page;
    }
  
    private LOCATORS = {
      button: (text: TypeButton) => this.page.locator(`//*[@id="headerPanel"]//a[text()="${text}"]`),
    };
  
    public async clickButton(typeButton: TypeButton): Promise<void> {
      await this.LOCATORS.button(typeButton).click();
    }
  }