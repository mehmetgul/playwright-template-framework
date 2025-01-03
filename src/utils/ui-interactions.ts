import { Page, Frame, Locator } from '@playwright/test';
import { loadConfig } from '../utils/config-loader';

/**
 * Utility class for common UI interactions
 */
export class UIInteractions {
  constructor(private page: Page) {}
  private config = loadConfig(); 

  /**
   * Click on a Playwright Locator
   * @param target - Playwright Locator
   */
  async click(target: Locator): Promise<void> {
    console.info(`Clicking on Locator: ${target}`);
    await target.waitFor({ state: 'attached' });
    await target.click();
  }

  /**
   * Fill input field
   * @param target - Input field Locator
   * @param value - Value to input
   */
  async fill(target: Locator, value: string): Promise<void> {
    console.info(`Filling input at Locator: ${target} with value: ${value}`);
    await target.waitFor({ state: 'attached' });
    await target.fill(value);
  }

  /**
   * Get text content of a Playwright Locator
   * @param target - Playwright Locator
   * @returns The text content of the Locator, or null if not found
   */
  async getText(target: Locator): Promise<string | null> {
    console.info(`Fetching text content from Locator: ${target}`);
    await target.waitFor({ state: 'visible' });
    return target.textContent();
  }

  /**
   * Get text content of a specific occurrence of a Locator
   * @param target - Playwright Locator
   * @param index - Index of the element (0-based)
   * @returns The text content of the nth Locator, or null if not found
   */
  async getTexts(target: Locator, index: number = 0): Promise<string | null> {
    console.info(`Fetching text content from Locator: ${target}, index: ${index}`);
    const element = target.nth(index);
    await element.waitFor({ state: 'visible' });
    return element.textContent();
  }

  /**
   * Hover over a Playwright Locator
   * @param target - Locator of the element to hover
   */
  async hover(target: Locator): Promise<void> {
    console.info(`Hovering over Locator: ${target}`);
    await target.waitFor({ state: 'visible' });
    await target.hover();
  }

    /**
     * Navigate to a URL
     * @param url - Full URL to navigate to
     */
    async navigateTo(url: string): Promise<void> {
        console.info(`Navigating to: ${url}`);
        await this.page.goto(url);
    }

  /**
   * Select an option from a dropdown
   * @param target - Dropdown Locator
   * @param value - Value to select
   */
  async selectDropdown(target: Locator, value: string): Promise<void> {
    console.info(`Selecting option "${value}" from dropdown Locator: ${target}`);
    await target.waitFor({ state: 'attached' });
    await target.selectOption({ value });
  }

  /**
   * Switch to a specific browser tab
   * @param index - Index of the tab (0-based)
   */
  async switchTab(index: number): Promise<void> {
    const pages = this.page.context().pages();
    if (pages[index]) {
      console.info(`Switching to tab with index: ${index}`);
      await pages[index].bringToFront();
    } else {
      throw new Error(`Tab with index ${index} does not exist.`);
    }
  }

  /**
   * Switch to a specific iframe
   * @param frameName - Name of the iframe
   * @returns Frame object if found
   */
  async switchFrame(frameName: string): Promise<Frame> {
    console.info(`Switching to iframe with name: ${frameName}`);
    const frame = this.page.frame({ name: frameName });
    if (frame) {
      return frame;
    } else {
      throw new Error(`Frame with name ${frameName} not found.`);
    }
  }
}
