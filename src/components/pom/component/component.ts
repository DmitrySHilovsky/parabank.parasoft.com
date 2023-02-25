import { Locator, Page } from "@playwright/test";

export class Component {
    constructor(readonly locator: Locator, readonly page: Page) {}
}