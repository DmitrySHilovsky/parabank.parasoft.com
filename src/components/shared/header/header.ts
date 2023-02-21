import type { Page } from "@playwright/test";
import { RightSideNavigation } from "./right-side-navigation";
import { LeftSideNavigation } from "./left-side-navigation"

export class Header {
  constructor(readonly page: Page) {
    this.page = page;
  }

  private LOCATORS = {
    logoAdmin : this.page.locator('//img[@class="admin"]'),     
    logoCompany : this.page.locator('//img[@class="logo"]'),    
    tagline : this.page.locator('//p[text()="Experience the difference"]')
  };

  RightSideNavigation = new RightSideNavigation(this.page);
  LeftSideNavigation = new LeftSideNavigation(this.page);

  public async clickLogoAdmin(): Promise<void> {
    await this.LOCATORS.logoAdmin.click();
  }

  public async clickLogoCompany(): Promise<void> {
    await this.LOCATORS.logoCompany.click();
  }
}
