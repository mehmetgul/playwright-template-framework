import { defineConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Get environment variable or default to 'dev'
const environment = process.env.ENV || 'dev';
const configPath = path.join(__dirname, `config/${environment}.json`);

// Load the configuration file
if (!fs.existsSync(configPath)) {
  throw new Error(`Configuration file not found for environment: ${environment}`);
}
const envConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: envConfig.baseURL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } },
  ],
  reporter: [
    ['list'],
    ['html', { outputFolder: 'artifacts/playwright/html-report' }],
    ['allure-playwright', { outputFolder: 'artifacts/allure/allure-results' }],
  ],
  outputDir: 'artifacts/playwright/test-results',
  workers: 6,
});
