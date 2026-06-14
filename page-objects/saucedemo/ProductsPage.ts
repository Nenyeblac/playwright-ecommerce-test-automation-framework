import { Page, Locator } from "@playwright/test";

// Products Page Object - Represents the SauceDemo inventory/products page
export class ProductsPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly inventoryContainer: Locator;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly sortDropdown: Locator;
    readonly burgerMenu: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.locator('.title');
        this.inventoryContainer = page.locator('.inventory_container');
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartBadge = page.locator('.shopping_cart_container');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('.product_sort_container');
        this.burgerMenu = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    // Navigate directly to products page
    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    // Get page title text
    async getPageTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    //check it's on product page
    async isOnProductsPage(): Promise<boolean> {
        const url = this.page.url();
        return url.includes('inventory.html');
    }

    // Get counts of products
    async getProductCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    // Get all product names
    async getAllProductNames(): Promise<string[]> {
        const items = await this.inventoryItems.all();
        const names: string [] = [];

        for(const item of items) {
            const name = await item.locator('.inventory_item_name').textContent();
            if(name) names.push(name);
        }
        return names;
    }

    //Get all product prices
    async getAllProductPrices(): Promise<number[]> {
        const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
        const allPrice = priceTexts.map(price => parseFloat(price.replace('$', '')));
        return allPrice;
    }

    // Add product to cart by name
    async addProductToCartByName(productName: string) {
        const product = this.page.locator('.inventory_item', {hasText: productName});
        await product.locator('button:has-text("Add to cart")').click();
    }

    // Add product to cart by index
    async addProductToCartByIndex(index: number) {
        await this.inventoryItems.nth(index).locator('button').click();
    }

    // Remove product from cart by name
    async removeProductFromCart(productName: string) {
        const product = this.page.locator('.inventory_item', {hasText: productName});
        await product.locator('button:has-text("Remove")').click();
    }

    // Shopping cart item count
    async getCartItemCount(): Promise<number> {
        const isVisible = await this.shoppingCartBadge.isVisible();
        if(!isVisible) return 0;

        const badgeText = await this.shoppingCartBadge.textContent();
        return parseInt(badgeText || '0');
    }

    // Click shopping cart
    async goToCart() {
        await this.shoppingCartLink.click();
    }

    // Sort products
    async sortBy (option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.waitFor({state: 'visible', timeout: 1000});
        await this.sortDropdown.selectOption(option);
        await this.page.waitForTimeout(1500);
    }

    // Get product details by name
    async getProductDetails(productName: string): Promise<{name: string, price: number, description: string}> {
        const product = this.page.locator('.inventory_item', {hasText: productName});
        const name = await product.locator('.inventory_item_name').textContent() || '';
        const priceText = await product.locator('.inventory_item_price').textContent() || '$0';
        const price = parseFloat(priceText.replace('$', ''));
        const description = await product.locator('.inventory_item_desc').textContent() || '';

        return {name, price, description};
    }

    // Check if inventory is in cart (button should show "Remove")
    async isProductInCart(productName: string): Promise<boolean> {
        const product = this.page.locator('.ininventory_item', {hasText: productName});
        const buttonText = await product.locator('button').textContent();
        return buttonText === 'Remove';
    }

    // Click on product name to view details
    async clickProductName(productName: string) {
        await this.page.locator('inventory_item_name', {hasText: productName}).click();
    }

    // Logout
    async logout() {
        await this.burgerMenu.click();
        await this.logoutLink.click();
    }

    // Add multiple products to cart by name
    async addMultipleProducts(productNames: string[]) {
        for(const name of productNames) {
            this.addProductToCartByName(name);
        }
    }

    // Get the first product name
    async getFirstProductName(): Promise<string> {
        return await this.inventoryItems.first().locator('.inventory_item_name').textContent() || '';
    }

    // Check if products are sorted from A to Z
    async areProductsSortedAtoZ(): Promise<boolean> {
        const names = await this.getAllProductNames();
        const sorted = [...names].sort();
        return JSON.stringify(names) === JSON.stringify(sorted);
    }

    async areProductsSortedZtoA(): Promise<boolean> {
        const names = await this.getAllProductNames();
        const sorted = [...names].sort().reverse();
        return JSON.stringify(names) === JSON.stringify(sorted);
    }

    // Check if products are sorted by price (low to high)
    async areProductsSortedLowToHi(): Promise<boolean> {
        const prices = await this.getAllProductPrices();
        const sorted = [...prices].sort((a,b) => a-b);
        return JSON.stringify(prices) === JSON.stringify(sorted);
    }

    // Check if products are sorted by price (low to high)
    async areProductsSortedHiToLow(): Promise<boolean> {
        const prices = await this.getAllProductPrices();
        const sorted = [...prices].sort((a,b) => b-a);
        return JSON.stringify(prices) === JSON.stringify(sorted);
    }

}