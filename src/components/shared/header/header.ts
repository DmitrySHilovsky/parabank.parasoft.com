import {Component} from "../../pom/component/component";
import { RightSideNavigation } from "./right-side-navigation";
import { LeftSideNavigation } from "./left-side-navigation"

export class Header extends Component {
  private LOCATORS = {
    header: this.locator,
    logoAdmin : this.locator.locator('//img[@class="admin"]'),
    logoCompany : this.locator.locator('//img[@class="logo"]'),
    tagline : this.locator.locator('//p[text()="Experience the difference"]')
  }

  RightSideNavigation = new RightSideNavigation(this.page);
  LeftSideNavigation = new LeftSideNavigation(this.page);

  public async clickLogoAdmin(): Promise<void> {
    await this.LOCATORS.logoAdmin.click();
  }

  public async clickLogoCompany(): Promise<void> {
    await this.LOCATORS.logoCompany.click();
  }
}
