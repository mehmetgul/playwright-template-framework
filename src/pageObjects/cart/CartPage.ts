import { Page } from '@playwright/test';
import { UIInteractions } from '../../utils/ui-interactions';

export class CartPage {
  private page: Page;
  private ui: UIInteractions;

  constructor(page: Page) {
    this.page = page;
    this.ui = new UIInteractions(page);
  }

  // Lazy initialization of locators
  private get cartItemCount() {
    return this.page.locator('.cart-products-count').last();
  }

  private get cartLink() {
    return this.page.getByRole('link', { name: 'Cart' });
  }

  async verifyProductInCart(expectedCount: string) {
    const rawCartItemCount = await this.ui.getText(this.cartItemCount);
    const cartItemCount = rawCartItemCount?.replace(/[^\d]/g, ''); // Remove non-digit characters
    if (cartItemCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items in the cart, but found ${rawCartItemCount}`);
    }
  }

  async navigateToCart() {
    await this.ui.click(this.cartLink);
  }
}
