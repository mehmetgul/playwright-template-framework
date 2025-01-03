import { APIRequestContext, test as base, Page, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import winston, { Logger } from 'winston';
import { UserAPI } from '../api/UserAPI';
import { loadConfig } from '../utils/config-loader';
import { ensureFolderExists } from '../utils/file-utils';
import { generateOrderData, generateReviewData } from '../utils/test-data-generator';

const config: Record<string, any> = loadConfig();

export const test = base.extend<{
  navigateTo: (path: string) => Promise<void>,
  page: Page,
  request: APIRequestContext,
  config: Record<string, any>,
  data: { userData: Record<string, any>, productData: Record<string, any> },
  api: { user: UserAPI },
  logger: Logger,
  takeScreenshot: (name: string) => Promise<void>,
  utils: {
    waitForResponse: (
      apiPattern: string | RegExp,
      requestAction: () => Promise<void>
    ) => Promise<any>,
    generateRandomNumber: (min: number, max: number) => number,
  },
  fileHandler: {
    readFile: (filePath: string) => string | void,
    writeFile: (filePath: string, data: string) => void,
    deleteFile: (filePath: string) => void,
  },
}>({
  // Navigate to Fixture
  navigateTo: async ({ page, config }, use) => {
    const navigate = async (path: string = '') => {
      await page.pause();
      console.log(`Config baseURL: ${config.baseURL}`); // Log the baseURL
      console.log(`Path provided: ${path}`);           // Log the provided path
  
      const url = new URL(path, config.baseURL).toString(); // Combine baseURL and path
      console.log(`Navigating to: ${url}`);                // Log the final URL
  
      await page.goto(url);
    };
    await use(navigate);
  },
   

  // Page Fixture
  page: async ({ page }, use) => {
    await use(page);
  }, // Add comma here

  // API Request Fixture
request: async ({ playwright }, use) => {
  const apiRequestContext = await playwright.request.newContext({
    baseURL: config.baseURL, // Use your config's baseURL here
    extraHTTPHeaders: {
      'Content-Type': 'application/json', // Set default headers if needed
    },
  });

  await use(apiRequestContext);

  // Dispose of the context after the test
  await apiRequestContext.dispose();
},


  // Environment Config Fixture
  config: async ({}, use) => {
    await use(config);
  }, // Add comma here

  // Data Factory Fixture
  data: async ({}, use) => {
    const userData = generateOrderData();
    const productData = generateReviewData();
    await use({ userData, productData });
  }, // Add comma here

  // API Abstraction Fixture
  api: async ({ request }, use) => {
    const user = new UserAPI(request);
    await use({ user });
  }, // Add comma here

  // Logger Fixture
logger: async ({}, use) => {
  const logsFolder = path.join(__dirname, '../../artifacts/playwright/logs');
  ensureFolderExists(logsFolder);

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `${logsFolder}/test.log` }),
    ],
  });
  await use(logger);
},

// Screenshot Utility Fixture
takeScreenshot: async ({ page }, use) => {
  const screenshotsFolder = path.join(__dirname, '../../artifacts/playwright/screenshots');
  const ensureFolderExists = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  };
  ensureFolderExists(screenshotsFolder);

  const screenshot = async (name: string) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(screenshotsFolder, `${timestamp}_${name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved: ${screenshotPath}`);
  };
  await use(screenshot);
},

  // Utility Functions Fixture
  utils: async ({ page, takeScreenshot }, use) => {
    const waitForResponse = async (
      apiPattern: string | RegExp,
      requestAction: () => Promise<void>
    ): Promise<any> => {
      const [response] = await Promise.all([
        page.waitForResponse((res) => res.url().match(apiPattern) !== null),
        requestAction(),
      ]);

      const contentType = response.headers()['content-type'];

      if (contentType?.includes('application/json')) {
        return await response.json();
      } else {
        console.error(`Unexpected response type: ${contentType}`);
        return await response.text();
      }
    };

    const generateRandomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    await use({ waitForResponse, generateRandomNumber });
  }, // Add comma here

  // File Handler Fixture
  fileHandler: async ({}, use) => {
    const handler = {
      readFile: (filePath: string): string | void => {
        const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(__dirname, '../../', filePath);
        if (fs.existsSync(absolutePath)) {
          return fs.readFileSync(absolutePath, 'utf8');
        }
        console.error(`File not found: ${absolutePath}`);
      },
      writeFile: (filePath: string, data: string): void => {
        const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(__dirname, '../../', filePath);
        fs.writeFileSync(absolutePath, data, 'utf8');
        console.log(`File written: ${absolutePath}`);
      },
      deleteFile: (filePath: string): void => {
        const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(__dirname, '../../', filePath);
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
          console.log(`File deleted: ${absolutePath}`);
        }
      },
    };
    await use(handler);
  }, // Add comma here
});

export { expect } from '@playwright/test';
