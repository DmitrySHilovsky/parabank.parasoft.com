import { Locator, Page } from "playwright-core";

export class Input {
    constructor(readonly locator:Locator, readonly page: Page) {
        this.locator = locator;
        this.page = page;
      }

    private LOCATORS = {
        
    }
    //  //tr[.//input[contains(@id, "firstName")]]/td/span
    private async getErrorText(){
       
    }

    public async fill(value:string) {
        this.locator.fill(value)
    }

    public async checkErrorText() {

    }


}