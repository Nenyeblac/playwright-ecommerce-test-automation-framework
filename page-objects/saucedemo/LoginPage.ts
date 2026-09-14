import { Page, Locator } from '@playwright/test';

// Login Page Object - Represents the SauceDemo login page
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passWordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly errorButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.getByPlaceholder('Username');
        this.passWordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByRole('alert');
        this.errorButton = this.errorMessage.getByRole('button', { name: 'Dismiss error' });
    }

    // Navigate to the login page
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passWordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }

    async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    async clearError() {
        await this.errorButton.click();
    }

    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.loginButton.isEnabled();
    }

}
