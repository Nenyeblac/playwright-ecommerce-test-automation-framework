import {test, expect} from '@playwright/test';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';

test.describe('SauceDemo Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    //Valid Login scenarios
    test.describe('Valid Login Scenarios', () => {

        test('should log in with standard user', async({page}) => {
            await loginPage.login('standard_user', 'secret_sauce');
            await expect(page).toHaveURL('/.*inventory.html/');
        })
    })


})