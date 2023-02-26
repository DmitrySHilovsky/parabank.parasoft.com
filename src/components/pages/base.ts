import { Page } from "@playwright/test";
import { Header } from "../shared/header/header";
import { Login } from "../shared/login/login";

const BASE_URL = "https://parabank.parasoft.com/parabank/index.htm";

export abstract class BasePage {
  currentURL: string;

  protected constructor(readonly page: Page, currentURL?: string) {
    this.page = page;
    this.currentURL = currentURL ?? BASE_URL;
  }

  private LOCATORS = {
    containerHeader: this.page.locator('//div[@id="mainPanel"]'),
  }

  Header = new Header(this.LOCATORS.containerHeader, this.page);
  Login = new Login(this.page);

  public async visitPage(link?: string): Promise<void> {
    await this.page.goto(link ?? this.currentURL);
  }

  public async getTitle(): Promise<string> {
    return (await this.page.innerText("title")).trim();
  }

  public async getUrl(): Promise<string> {
    return this.page.url();
  }
}
