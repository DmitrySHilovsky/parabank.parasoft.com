import {Component} from "../../pom/component/component";
import { Login } from "../login/login";

export class leftPanel extends Component {
  private LOCATORS = {
    leftPanel: this.locator,
    login: this.page.locator('//form[@name="login"]'),
  }

  login = new Login(this.LOCATORS.login, this.page);


  public async clickLogoAdmin(): Promise<void> {
    // await this.LOCATORS.logoAdmin.click();
  }
}