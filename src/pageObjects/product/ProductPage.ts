import { Page } from '@playwright/test';
import { UIInteractions } from '../../utils/ui-interactions';

export class ProductPage {
  private page: Page;
  private ui: UIInteractions;

  constructor(page: Page) {
    this.page = page;
    this.ui = new UIInteractions(this.page);
  }

  // Lazy initialization of locators
  private get firstProduct() {
    return this.page.locator('.product-title a').first();
  }

  private get addToCartButton() {
    return this.page.locator('.btn.btn-primary.add-to-cart');
  }

  private get returnToShoppingButton() {
    return this.page.locator("button[class='btn btn-secondary']");
  }

  private get firstProductTitle() {
    return this.page.locator('.product-title').first();
  }

  // implemnatation
  async getProductName(): Promise<string | null> {
    return await this.ui.getText(this.firstProductTitle);
  }

  async selectFirstProduct() {
    await this.ui.click(this.firstProduct);
  }

  async addProductToCart() {
    await this.ui.click(this.addToCartButton);
  }
  
  async returnToShopping() {
    await this.ui.click(this.returnToShoppingButton);
  }
}
