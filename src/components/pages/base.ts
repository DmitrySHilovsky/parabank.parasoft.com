import { Page } from "@playwright/test";
import { Header } from "../shared/header/header";
import { Login } from "../shared/login/login";

const BASE_URL = "https://parabank.parasoft.com/parabank/index.htm";

export abstract class BasePage {
  currentURL: string;

  protected constructor(readonly page: Page, currentURL:string=BASE_URL) {
    this.page = page;
    this.currentURL = currentURL;
  }

  Header = new Header(this.page); 
  login = new Login(this.page);

  public async visitPage(link = this.currentURL): Promise<void> {
    link = this.currentURL;
    await this.page.goto(link);
  }

  public async getTitle(): Promise<string> {
    return (await this.page.innerText("title")).trim();
  }

  public async getUrl(): Promise<string> {
    return await this.page.url();
  }
}
