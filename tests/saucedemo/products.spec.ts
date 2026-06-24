import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { SauceDemoUsers } from '../../utils/env-test-data';
import { TestData } from '../../utils/test-data';
import { TestURLs } from '../../utils/env-test-data';

test.describe('Saucedemo Products Tests', () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);

        await loginPage.goto();
        await loginPage.login(
            SauceDemoUsers.Valid_Users.standard.username,
            SauceDemoUsers.Valid_Users.standard.password
        );
    });

    //Product Display Verification
    test.describe('Product Display Verification', () => {

        test('should display all products', async() => {
            const productCount = await productsPage.getProductCount();
            expect(productCount).toBe(6);

        });

        test('should have correct product count', async() => {
            const productCount = await productsPage.getProductCount();
            expect(productCount).toBeGreaterThan(0);
            expect(productCount).toBe(6);
        });

        test('should display page title', async() => {
            await expect(productsPage.pageTitle).toBeVisible();
            await expect(productsPage.pageTitle).toHaveText('Products');
        });

        test('should have visible product container', async() => {
            await expect(productsPage.shoppingCartBadge).toBeVisible();
        });

        test('should display all product names', async() => {
            const names = await productsPage.getAllProductNames();
            expect(names.length).toBe(6);
            names.forEach(name => expect(name).toBeTruthy());
        });

        test('should display all product prices', async() => {
            const products = await productsPage.inventoryItems.all();
            for(const product of products) {
                const price = await product.locator('.inventory_item_price').textContent();
                expect(price).toContain('$');
            }
        });

    });

    // Sorting Funtionality
    test.describe('Sorting Functionality', () => {

        test('should have default sort as A to Z', async() => {
            const names = await productsPage.getAllProductNames();
            const sortedNames = [...names].sort();
            expect(names).toEqual(sortedNames);    
        });

        test('should sort products from A to Z', async() => {
            await productsPage.sortBy('az');
            const names = await productsPage.getAllProductNames();
            const sortedNames = [...names].sort();
            expect(names).toEqual(sortedNames);
        });

        test('should sort products from Z to A', async() => {
            await productsPage.sortBy('za');
            const names = await productsPage.getAllProductNames();
            const sortedNames = [...names].sort().reverse();
            expect(names).toEqual(sortedNames);
        });

        test('should sort price from low to high', async() => {
            await productsPage.sortBy('lohi');
            const names = await productsPage.getAllProductNames();
            expect(names[0]).toBe(TestData.PRODUCTS.ONESIE.name);
        });
        test('should sort price from high to low', async() => {
            await productsPage.sortBy('hilo');
            const names = await productsPage.getAllProductNames();
            expect(names[0]).toBe(TestData.PRODUCTS.FLEECE_JACKET.name);
        });

    });

    // Add to Cart Operations
    test.describe('Add to Cart Operations', () => {

        test('should add single item to cart', async() => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            const cartCount = await productsPage.getCartItemCount();
            expect(cartCount).toBe(1);
        });

        test('should add multiple items to cart', async() => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);
            const cartCount = await productsPage.getCartItemCount();
            expect(cartCount).toBe(2);
        });

        test('should add item to cart by index', async() => {
            const products = await productsPage.inventoryItems.all();
            await products[0].locator('button:has-text("Add to Cart")').click();
            const cartCount = await productsPage.getCartItemCount();
            expect(cartCount).toBe(1);
        });

        test('should change button to Remove after adding item', async() => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            const isInCart = await productsPage.isProductInCart(TestData.PRODUCTS.BACKPACK.name);
            expect(isInCart).toBeTruthy();
        });

        test('should update cart badge when item is added to cart', async() => {
            let cartCount = await productsPage.getCartItemCount();
            expect(cartCount).toBe(0);

            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            cartCount = await productsPage.getCartItemCount();
            expect(cartCount).toBe(1);
        });

        

    });

    // Remove from Cart operations
    test.describe('Remove from Cart operations', () => {

        test('should remove single product from cart', async() => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.removeProductFromCart(TestData.PRODUCTS.BACKPACK.name);
            
            const cartCount = await productsPage.getCartItemCount();
            expect(cartCount).toBe(0);

        });

        test('should decrement cart badge when removing', async() => {
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BACKPACK.name);
            await productsPage.addProductToCartByName(TestData.PRODUCTS.BIKE_LIGHT.name);

            let cartCount = await productsPage.getCartItemCount();
            expect(cartCount).toBe(2);

            await productsPage.removeProductFromCart(TestData.PRODUCTS.BACKPACK.name);
            cartCount = await productsPage.getCartItemCount();
            expect(cartCount).toBe(1);

        });

    });

    // Product Navigation
    test.describe('Product Navigation', () => {

        test('should navigate to product detail', async({page}) => {
            await page.locator('.inventory_item_name').first().click();
            await expect(page).toHaveURL(/.*inventory-item.html/);
        });

        test('should navigate to cart', async({page}) => {
            await productsPage.goToCart();
            await expect(page).toHaveURL(/.*cart.html/);
        });

    });

    // Product Information
    test.describe('Get Product Information', () => {

        test('should display product names correctly', async() => {
            const names = await productsPage.getAllProductNames();
            expect(names).toContain(TestData.PRODUCTS.BACKPACK.name);
            expect(names).toContain(TestData.PRODUCTS.BIKE_LIGHT.name);
        });

        test('should display product prices correctly', async({page}) => {
            const price = await productsPage.getProductPrice(TestData.PRODUCTS.BACKPACK.name);
            expect(price).toContain('$');
            expect(parseFloat(price.replace('$', ''))).toBeGreaterThan(0);
        });

        test('should have correct product details', async() => {
            const products = await productsPage.inventoryItems.all();

            for(const product of products){
                const name = await product.locator('.inventory_item_name').textContent();
                const desc = await product.locator('.inventory_item_desc').textContent();
                const price = await product.locator('.inventory_item_price').textContent();

                expect(name).toBeTruthy;
                expect(desc).toBeTruthy;
                expect(price).toBeTruthy;
            }
        });

    });

    // User Menu
    test.describe('User Menu', () => {

        test('should logout successsfully', async({page}) => {
            await productsPage.logout(); 
            await expect(page).toHaveURL(TestURLs.sauceDemo);
        })
    })

})