import { Page } from "@playwright/test";

const BASE_URL = "https://parabank.parasoft.com/parabank/index.htm";

export abstract class BasePage {
  protected constructor(readonly page: Page, currentURL?: string) {
    this.page = page;
    this.currentURL = currentURL ?? BASE_URL;
  }

  protected currentURL: string;

  public async visitPage(link?: string): Promise<void> {
    await this.page.goto(link ?? this.currentURL, {waitUntil: "domcontentloaded"});
  }

  public async getTitle(): Promise<string> {
    return (await this.page.innerText("title")).trim();
  }

  public async getUrl(): Promise<string> {
    return this.page.url();
  }
}
