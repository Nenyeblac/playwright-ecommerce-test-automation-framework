import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { CartPage } from '../../page-objects/saucedemo/CartPage';
import { CheckoutPage } from '../../page-objects/saucedemo/CheckoutPage';

import { SauceDemoUsers } from '../../utils/env-test-data';
import { TestData } from '../../utils/test-data';

test.describe('SauceDemo Checkout Tests', () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(
            SauceDemoUsers.Valid_Users.standard.username,
            SauceDemoUsers.Valid_Users.standard.password
        );
        await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
        await productsPage.goToCart();
        await cartPage.clickCheckout();
    });

    // Valid Checkout Information
    test.describe('Valid Checkout Information', () => {

        test('should checkout with valid data', async ({ page }) => {
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.VALID.firstName,
                TestData.CHECKOUT_INFO.VALID.lastName,
                TestData.CHECKOUT_INFO.VALID.postCode
            );
            await checkoutPage.clickContinueButton();
            await expect(page).toHaveURL(/.*checkout-step-two.html/);
        });

        test('should fill field seperately', async ({ page }) => {
            await checkoutPage.firstNameInput.fill(TestData.CHECKOUT_INFO.VALID.firstName);
            await checkoutPage.lastNameInput.fill(TestData.CHECKOUT_INFO.VALID.lastName);
            await checkoutPage.postCodeInput.fill(TestData.CHECKOUT_INFO.VALID.postCode);

            await checkoutPage.clickContinueButton();
            await expect(page).toHaveURL(/.*checkout-step-two.html/);
        });

        test('should accept special characters in name', async ({ page }) => {
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.SPECIAL_CHARACTERS.firstName,
                TestData.CHECKOUT_INFO.SPECIAL_CHARACTERS.lastName,
                TestData.CHECKOUT_INFO.VALID.postCode
            );
            await checkoutPage.clickContinueButton();
            await expect(page).toHaveURL(/.*checkout-step-two.html/);
        });

        test('should accept special various postcode formats', async ({ page }) => {
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.VALID.firstName,
                TestData.CHECKOUT_INFO.VALID.lastName,
                TestData.CHECKOUT_INFO.SPECIAL_CHARACTERS.postCode
            );
            await checkoutPage.clickContinueButton();
            await expect(page).toHaveURL(/.*checkout-step-two.html/);
        });
    });

    // Form Field Validation
    test.describe('Form Field Validation', () => {

        test('should show error for missing first name', async () => {
            await checkoutPage.fillShippingInformation(
                '',
                TestData.CHECKOUT_INFO.VALID.lastName,
                TestData.CHECKOUT_INFO.VALID.postCode
            );
            await checkoutPage.clickContinueButton();
            await expect(checkoutPage.errorMessage).toBeVisible();
            const error = await checkoutPage.getErrorMessage();
            expect(error).toContain('First Name is required');
        });

        test('should show error for missing last name', async () => {
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.VALID.firstName,
                '',
                TestData.CHECKOUT_INFO.VALID.postCode
            );
            await checkoutPage.clickContinueButton();
            await expect(checkoutPage.errorMessage).toBeVisible();
            const error = await checkoutPage.getErrorMessage();
            expect(error).toContain('Last Name is required');
        });

        test('should show error for missing post code', async () => {
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.VALID.firstName,
                TestData.CHECKOUT_INFO.VALID.lastName,
                ''
            );
            await checkoutPage.clickContinueButton();
            await expect(checkoutPage.errorMessage).toBeVisible();
            const error = await checkoutPage.getErrorMessage();
            expect(error).toContain('Postal Code is required');
        });

        test('should show error for all the fields empty', async () => {
            await checkoutPage.clickContinueButton();
            await expect(checkoutPage.errorMessage).toBeVisible();
        });

        test('should dismiss error message on clicking error button', async ({ page }) => {
            await checkoutPage.clickContinueButton();
            await expect(checkoutPage.errorMessage).toBeVisible();
            await page.locator('.error-button').click();
            await expect(checkoutPage.errorMessage).not.toBeVisible();
        });
    });

    // Checkout navigation
    test.describe('Checkout navigation', () => {

        test('should cancel from checkout', async ({ page }) => {
            await page.locator('#cancel').click();
            await expect(page).toHaveURL(/.*cart.html/);
        });

        test('should go back to cart', async ({ page }) => {
            await page.locator('#cancel').click();
            await expect(page).toHaveURL(/.*cart.html/);

            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(1);
        });

        test('should persist form field data', async () => {
            await checkoutPage.firstNameInput.fill(TestData.CHECKOUT_INFO.VALID.firstName);
            await checkoutPage.lastNameInput.fill(TestData.CHECKOUT_INFO.VALID.lastName);

            const firstName = await checkoutPage.firstNameInput.inputValue();
            const lastName = await checkoutPage.lastNameInput.inputValue();

            expect(firstName).toBe('John');
            expect(lastName).toBe('Doe');
        });
    });

    // Checkout Overview
    test.describe('Checkout Overview', () => {

        test.beforeEach(async () => {
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.VALID.firstName,
                TestData.CHECKOUT_INFO.VALID.lastName,
                TestData.CHECKOUT_INFO.VALID.postCode
            );
            await checkoutPage.clickContinueButton();
        });

        test('should display item names', async ({ page }) => {
            const itemName = await page.locator('.inventory_item_name').textContent();
            expect(itemName).toBe('Sauce Labs Backpack');
        });

        test('should display correct item price', async ({ page }) => {
            const itemPrice = await page.locator('.inventory_item_price').textContent();
            expect(itemPrice).toContain('$');
        });

        test('should calculate subtotal correctly', async ({ page }) => {
            const subtotal = await page.locator('.summary_subtotal_label').textContent();
            expect(subtotal).toContain('$');
        });

        test('should calculate tax correctly', async ({ page }) => {
            const tax = await page.locator('.summary_tax_label').textContent();
            expect(tax).toContain('$');
        });

        test('should calculate total correctly', async ({ page }) => {
            const total = await page.locator('.summary_total_label').textContent();
            expect(total).toContain('$');
        });

        test('should display payment information', async ({ page }) => {
            const paymentInfo = await page.locator('.summary_value_label').first().textContent();
            expect(paymentInfo).toBeTruthy();
        });
    });

    // Order Summary
    test.describe('Order Summary', () => {

        test.beforeEach(async () => {
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.VALID.firstName,
                TestData.CHECKOUT_INFO.VALID.lastName,
                TestData.CHECKOUT_INFO.VALID.postCode
            );
            await checkoutPage.clickContinueButton();
        })

        test('should show complete order summary', async ({ page }) => {
            await expect(page.locator('.summary_info')).toBeVisible();
            await expect(page.locator('.cart_list')).toBeVisible();
        });

        test('should display shipping information', async ({ page }) => {
            const shippingInfo = await page.locator('.summary_value_label').nth(1).textContent();
            expect(shippingInfo).toBeTruthy();
        });

        test('should verify total matches subtotal plus tax', async ({ page }) => {
            const subtotalText = await page.locator('.summary_subtotal_label').textContent() || '';
            const taxText = await page.locator('.summary_tax_label').textContent() || '';
            const totalText = await page.locator('.summary_total_label').textContent() || '';

            const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
            const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
            const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));

            expect(total).toBeCloseTo(subtotal + tax, 2);
        });

        test('should verify item count', async ({ page }) => {
            const items = await page.locator('.cart_item').all();
            expect(items.length).toBe(1);
        });

    });

    test.describe('Complete Order', () => {
        test.beforeEach(async ({ page }) => {
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.VALID.firstName,
                TestData.CHECKOUT_INFO.VALID.lastName,
                TestData.CHECKOUT_INFO.VALID.postCode
            );
            await checkoutPage.clickContinueButton();
        });

        test('should have finish button enabled', async () => {
            await expect(checkoutPage.finishButton).toBeEnabled();
        });

        test('should complete order successfully', async ({ page }) => {
            await checkoutPage.clickFinishButton();
            await expect(page).toHaveURL(/.*checkout-complete.html/);
        });

        test('should show. confirmation message', async () => {
            await checkoutPage.clickFinishButton();
            await expect(checkoutPage.completeHeader).toBeVisible();

            const message = await checkoutPage.getCompleteMessage();
            expect(message).toContain('Thank you for your order');
        });
    });

    // End-to-End Scenario
    test.describe('End-to-End Scenario', () => {
        test('should complete entire purchse flow', async ({ page }) => {
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.VALID.firstName,
                TestData.CHECKOUT_INFO.VALID.lastName,
                TestData.CHECKOUT_INFO.VALID.postCode
            );
            await checkoutPage.clickContinueButton();
            await checkoutPage.clickFinishButton();
            await expect(page).toHaveURL(/.*checkout-complete.html/);
            await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
        });

        test('should purchase multiple products', async ({ page }) => {
            await page.locator('#cancel').click();
            await cartPage.clickContinueShoppingButton();

            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            await productsPage.goToCart();

            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(2);

            await cartPage.clickCheckout();
            await checkoutPage.fillShippingInformation(
                TestData.CHECKOUT_INFO.VALID.firstName,
                TestData.CHECKOUT_INFO.VALID.lastName,
                TestData.CHECKOUT_INFO.VALID.postCode
            );
            await checkoutPage.clickContinueButton();

            const items = await page.locator('.cart_item').all();
            expect(items.length).toBe(2);
            await checkoutPage.clickFinishButton();
            await expect(checkoutPage.completeHeader).toBeVisible();
        });
    });

})