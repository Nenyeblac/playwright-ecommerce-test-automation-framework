import { Page, Locator } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    protected baseUrl: string;

    constructor(page: Page, baseUrl = "https://www.saucedemo.com") {
        this.page = page;
        this.baseUrl = baseUrl;
    }

    async goto(url: string = ""): Promise<void> {
        const baseUrl = new URL(this.baseUrl);
        if (!baseUrl.pathname.endsWith("/")) {
            baseUrl.pathname += "/";
        }

        await this.page.goto(new URL(url, baseUrl).toString());
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async getDocumentTitle(): Promise<string> {
        return this.page.title();
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? "";
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return locator.isVisible();
    }

    async waitForVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "visible" });
    }
}
