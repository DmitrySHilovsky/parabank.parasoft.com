import { BasePage } from '../../pages/base';

export class Container extends BasePage {
    constructor(readonly page, currentURL?: string) {
        super(page, currentURL);
        currentURL = this.currentURL;
    }
}