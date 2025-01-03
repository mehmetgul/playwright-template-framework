import fs from 'fs';
import path from 'path';

const foldersToDelete: string[] = [
  'allure-results',
  'artifacts',
  // 'artifacts/playwright/html-report',
  // 'artifacts/playwright/test-results',
  // 'artifacts/playwright/screenshots',
  // 'artifacts/playwright/videos',
  // 'artifacts/playwright/logs',
  // 'artifacts/playwright',
  // 'artifacts/allure/allure-results',
  // 'artifacts/allure/allure-report',
];

foldersToDelete.forEach((folder: string) => {
  const fullPath: string = path.join(__dirname, folder);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Deleted: ${fullPath}`);
  }
});
