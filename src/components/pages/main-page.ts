import { BasePage } from "./base";
import { Page } from "@playwright/test";

export class MainPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}