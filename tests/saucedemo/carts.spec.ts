import { test, expect } from '@playwright/test';

import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { CartPage } from '../../page-objects/saucedemo/CartPage';
import { SauceDemoUsers } from '../../utils/env-test-data';
import { TestData } from '../../utils/test-data';

test.describe('SauceDemo Cart Tests', () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login(
            SauceDemoUsers.Valid_Users.standard.username,
            SauceDemoUsers.Valid_Users.standard.password
        );
    });

    // Add Items to Cart
    test.describe('Adding items to cart', () => {

        test('should add single item', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(1);
        })

        test('should add multiple items', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            await productsPage.goToCart();
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(2);
        })

        test('should add all items', async () => {
            const products = await productsPage.getAllProductNames();
            for (const product of products) {
                await productsPage.addProductToCartByName(product);
            }
            await productsPage.goToCart();
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(products.length);
        });

        test('should show checkout button when item is added to cart', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            await expect(cartPage.checkoutButton).toBeVisible();
            await expect(cartPage.checkoutButton).toBeEnabled();
        })
    });

    // Remove Items from Cart
    test.describe('Remove Items From Cart', () => {

        test('should remove cart item from products page', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.removeProductFromCart(TestData.PRODUCTS.BACKPACK.name);
            const cartCount = await productsPage.getCartItemCount();
            expect(cartCount).toBe(0);
        });

        test('should remove cart item from cart page', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            await cartPage.removeItemByName(TestData.PRODUCTS.BACKPACK.name);
            const itemCount = await cartPage.getCartItemCount();
            await expect(itemCount).toBe(0);
        });

        test('should remove multiple cart items from cart page', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            await productsPage.goToCart();
            await cartPage.removeItemByName(TestData.PRODUCTS.BACKPACK.name);
            let itemCount = await cartPage.getCartItemCount();
            await expect(itemCount).toBe(1);

            await cartPage.removeItemByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            itemCount = await cartPage.getCartItemCount();
            await expect(itemCount).toBe(0);
        });

        test('should remove all cart items from cart page', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            await productsPage.goToCart();
            const items = await cartPage.getCartItemNames();
            for (const item of items) {
                await cartPage.removeItemByName(item)
            }

            const itemCount = await cartPage.getCartItemCount();
            await expect(itemCount).toBe(0);
        });
    });

    // Cart Navigation
    test.describe('Navigating the Cart', () => {

        test('should navigate to cart page from product page', async ({ page }) => {
            await productsPage.goToCart();
            await expect(page).toHaveURL(/.*cart.html/);
            await expect(cartPage.pageTitle).toHaveText('Your Cart');
        });

        test('should continue shopping from cart', async ({ page }) => {
            await productsPage.goToCart();
            await cartPage.clickContinueShoppingButton();
            await expect(page).toHaveURL(/.*inventory.html/);
        });

        test('should navigate back and forth', async ({ page }) => {
            await productsPage.goToCart();
            await expect(page).toHaveURL(/.*cart.html/);
            await cartPage.clickContinueShoppingButton();
            await expect(page).toHaveURL(/.*inventory.html/);

            await productsPage.goToCart();
            await expect(page).toHaveURL(/.*cart.html/);
        });
    });

    // Cart Calculations
    test.describe('Cart Calculations', () => {

        test('should calculate the price of single item', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            const price = await productsPage.getProductPrice(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            const cartPrice = await cartPage.getItemPrice(TestData.PRODUCTS.BACKPACK.name);
            expect(cartPrice).toBe(price);
        });

        test('should calculate multiple items total', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            await productsPage.goToCart();
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(2);
        });

        test('should show correct cart badge count', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            let badgeCount = await productsPage.getCartItemCount();
            expect(badgeCount).toBe(1);

            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            badgeCount = await productsPage.getCartItemCount();
            expect(badgeCount).toBe(2);
        });
    });

    // Cart Item Details
    test.describe('Get Cart Item Details', () => {

        test('should diplay cart item details correctly', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            const isInCart = await cartPage.isItemInCart(TestData.PRODUCTS.BACKPACK.name);
            expect(isInCart).toBeTruthy;

            const price = await cartPage.getItemPrice(TestData.PRODUCTS.BACKPACK.price);
            expect(price).toContain('$');
        });

        test('should show product description in cart', async ({ page }) => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            const desc = await cartPage.getCartItemDescription(TestData.PRODUCTS.BACKPACK.name);
            expect(desc).toBeTruthy;
        });
    });

    // Empty Cart Scenarios
    test.describe('Empty Cart Scenarios', () => {

        test('should display empty cart correctly', async () => {
            await productsPage.goToCart();
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(0);
        });

        test('should show empty cart after removing all', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            await cartPage.removeItemByName(TestData.PRODUCTS.BACKPACK.name);
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(0);
        });
    });

    // Cart Persistence
    test.describe('Cart Persistence', () => {

        test('should maintain items in the cart across navigation', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            await cartPage.clickContinueShoppingButton();
            await productsPage.goToCart();
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(1);

            const isInCart = await cartPage.isItemInCart(TestData.PRODUCTS.BACKPACK.name);
            expect(isInCart).toBeTruthy();
        });
    });

    // Verification Methods
    test.describe('Verification Methods', () => {

        test('should verify product in cart', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            const isInCart = await cartPage.isItemInCart(TestData.PRODUCTS.BACKPACK.name);
            expect(isInCart).toBeTruthy();
        });

        test('should verify the content of the cart', async () => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            await productsPage.goToCart();
            const items = await cartPage.getCartItemNames();
            expect(items).toContain(TestData.PRODUCTS.BACKPACK.name);
            expect(items).toContain(TestData.PRODUCTS.BIKE_LIGHT.name);
        });
    });

    // Cart Display Details
    test.describe('Cart Display Details', () => {

        test('should display quantity as 1 for each added cart item', async ({ page }) => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.goToCart();
            const quantity = await page.locator('.cart_quantity').textContent();
            expect(quantity).toBe('1');
        });

        test('should display product description', async ({ page }) => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            await productsPage.goToCart();

            await expect(cartPage.cartItems.locator('.inventory_item_desc')).toHaveCount(2);
        });
    });

});
