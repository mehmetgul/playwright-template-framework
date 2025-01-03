import { Page } from '@playwright/test';
import { UIInteractions } from '../../utils/ui-interactions';

export class HomePage {
  private page: Page;
  private baseURL: string;
  private ui: UIInteractions;

  constructor(page: Page, baseURL: string) {
    this.page = page;
    this.baseURL = baseURL; // Inject the baseURL
    this.ui = new UIInteractions(page);
  }

  // Define locators as methods or lazily initialize them
  private get searchBar() {
    return this.page.locator('input[placeholder="Search our catalog"]');
  }

  async navigateTo(path: string = '') {
    // await this.page.pause();
    const url = (new URL(path, this.baseURL)).toString(); // Safely concatenate baseURL and path
    console.log(`Navigating to: ${url}`);
    await this.ui.navigateTo(url);
  }

  async searchForProduct(searchTerm: string) {
    await this.ui.fill(this.searchBar,searchTerm);
    await this.page.keyboard.press('Enter');
  }
}
