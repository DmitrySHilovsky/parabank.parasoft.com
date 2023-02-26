import { Container } from "../pom/container/container";
import { leftPanel } from "../shared/body/leftPanel";
import { Header } from "../shared/header/header";
import { Login } from "../shared/login/login";

export class MainPage extends Container {
    private LOCATORS = {
        header: this.page.locator('//div[@id="mainPanel"]'),
        login: this.page.locator('//div[@id="loginPanel"]'),
        leftPanel: this.page.locator('//div[@id="leftPanel"]'),
        rightPanel: this.page.locator('//div[@id="rightPanel"]'),
    }

    Header = new Header(this.LOCATORS.header, this.page);
    Login = new Login(this.LOCATORS.login, this.page);
    LeftPanel = new leftPanel(this.LOCATORS.leftPanel, this.page);
}