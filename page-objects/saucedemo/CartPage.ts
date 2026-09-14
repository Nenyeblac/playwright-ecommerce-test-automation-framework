
import { Page, Locator } from '@playwright/test';

export class CartPage {

   readonly page: Page;
   readonly pageTitle: Locator;
   readonly cartItems: Locator;
   readonly checkoutButton: Locator;
   readonly continueShoppingButton: Locator;

   constructor(page: Page) {

      this.page = page;
      this.pageTitle = page.getByText('Your Cart', { exact: true });
      this.cartItems = page.locator('.cart_item');
      this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
      this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
   }

   async goto() {
      await this.page.goto('https://www.saucedemo.com/cart.html');
   }

   async getCartItemCount(): Promise<number> {
      await this.continueShoppingButton.waitFor();
      return await this.cartItems.count();
   }

   async getCartItemNames(): Promise<string[]> {
      await this.continueShoppingButton.waitFor();
      const items = await this.cartItems.all();
      const names: string[] = [];

      for (const item of items) {
         const label = await item.getByRole('button', { name: /^View details for / }).getAttribute('aria-label');
         if (label) names.push(label.replace(/^View details for /, ''));
      }

      return names;
   }

   async removeItemByName(productName: string) {
      const item = this.cartItems.filter({ has: this.page.getByRole('button', { name: `View details for ${productName}` }) });
      await item.getByRole('button', { name: 'Remove' }).click();
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
      await this.continueShoppingButton.waitFor();
      const item = this.cartItems.filter({ has: this.page.getByRole('button', { name: `View details for ${productName}` }) });
      return await item.isVisible();
   }

   async getCartItemDetails(productName: string) {
      const item = this.cartItems.filter({ has: this.page.getByRole('button', { name: `View details for ${productName}` }) });
      const name = await item.getByRole('button', { name: `View details for ${productName}` }).textContent() || '';
      const quantity = parseInt(await item.locator('.cart_quantity').textContent() || '0');
      return { name, quantity };
   }

   async getCartItemDescription(productName: string): Promise<string> {
      const item = this.page.locator('.cart_item', { hasText: productName });
      return await item.locator('.inventory_item_desc').textContent() || '';
   }

}
