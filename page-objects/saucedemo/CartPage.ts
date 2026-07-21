
import { Page, Locator } from '@playwright/test';

export class CartPage {

   readonly page: Page;
   readonly pageTitle: Locator;
   readonly cartItems: Locator;
   readonly checkoutButton: Locator;
   readonly continueShoppingButton: Locator;

   constructor(page: Page) {

      this.page = page;
      this.pageTitle = page.locator('.title');
      this.cartItems = page.locator('.cart_item');
      this.checkoutButton = page.locator('#checkout');
      this.continueShoppingButton = page.locator('#continue-shopping');
   }

   async goto() {
      await this.page.goto('https://www.saucedemo.com/cart.html');
   }

   async getCartItemCount(): Promise<number> {
      return await this.cartItems.count();
   }

   async getCartItemNames(): Promise<string[]> {
      const items = await this.cartItems.all();
      const names: string[] = [];

      for (const item of items) {
         const name = await item.locator('.inventory_item_name').textContent();
         if (name) names.push(name);
      }

      return names;
   }

   async removeItemByName(productName: string) {
      const item = this.page.locator('.cart_item', { hasText: productName });
      await item.locator('button:has-text("Remove")').click();
   }

   async clickCheckout() {
      await this.checkoutButton.click();
   }

   async clickContinueShoppingButton() {
      await this.continueShoppingButton.click();
   }

   async getItemPrice(productName: string): Promise<string> {
      const item = this.page.locator('.cart_item', { hasText: productName });
      const itemPrice = await item.locator('.inventory_item_price').textContent();
      return itemPrice || '';
   }

   async isItemInCart(productName: string): Promise<boolean> {
      const item = this.page.locator('.cart_item', { hasText: productName });
      return await item.isVisible();
   }

   async getCartItemDetails(productName: string) {
      const item = this.page.locator('.cart_item', { hasText: productName });
      const name = item.locator('.inventory_item_name').textContent() || '';
      const quantity = parseInt(await item.locator('.cart_quantity').textContent() || '0');
      return { name, quantity };
   }

   async getCartItemDescription(productName: string): Promise<string> {
      const item = this.page.locator('.cart_item', { hasText: productName });
      return await item.locator('.inventory_item_desc').textContent() || '';
   }

}