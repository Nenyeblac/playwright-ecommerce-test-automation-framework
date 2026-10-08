import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

// Login Page Object - Represents the SauceDemo login page
export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passWordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly errorButton: Locator;

    constructor(page: Page, baseUrl?: string) {
        super(page, baseUrl);

        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passWordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.getByRole('alert');
        this.errorButton = this.errorMessage.getByRole('button', { name: 'Dismiss error' });
    }

    // Navigate to the login page
    async goto(): Promise<void> {
        await super.goto('/');
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
