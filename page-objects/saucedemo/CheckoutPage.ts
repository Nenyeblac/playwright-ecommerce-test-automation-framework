import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.completeHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
        this.completeText = page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
        this.errorMessage = page.getByRole('alert');

    }

    async fillShippingInformation(firstName: string, lastName: string, postCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postCodeInput.fill(postCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async getCompleteMessage(): Promise<string> {
        return await this.completeHeader.textContent() || '';
    }

    async isOrderComplete(): Promise<boolean> {
        return await this.completeHeader.isVisible()
    }

    async clickBackHomeButton() {
        await this.backHomeButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }
}
