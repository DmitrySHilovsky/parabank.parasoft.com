import { BasePage } from '../../pages/base';

export class Container extends BasePage {
    constructor(readonly page, readonly currentURL = '') {
        super(page, currentURL);

        this.currentURL = currentURL;
    }
}