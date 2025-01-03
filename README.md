# Playwright Framework Template

This is a comprehensive test automation framework built using Playwright for end-to-end (E2E) testing. The framework is structured for scalability and maintainability, supporting advanced reporting and artifact management.

## Features

*  End-to-End testing with Playwright.
*  API testing support.
*  Advanced reporting using Allure and Playwright HTML reports.
*  Automated artifact cleanup (screenshots, videos, test results).
*  Configurable environment support via `config/` directory.

## Folder Structure

```
/playwright-template-framework
  ├── artifacts/
  │     ├── allure/
  │     │     ├── allure-results/
  │     │     └── allure-report/
  │     ├── playwright/
  │     │     ├── html-report/
  │     │     ├── logs/
  │     │     ├── screenshots/
  │     │     └── videos/
  ├── config/
  │     ├── dev.json
  │     ├── prod.json
  │     ├── qa.json
  │     └── uat.json
  ├── src/
  │     ├── api/
  │     │     └── UserAPI.ts
  │     ├── pageObjects/
  │     │     ├── CartPage.ts
  │     │     ├── HomePage.ts
  │     │     └── ProductPage.ts
  │     ├── fixtures/
  │     │     └── custom-fixtures.ts
  │     ├── utils/
  │     │     ├── config-loader.ts
  │     │     ├── file-utils.ts
  │     │     ├── test-data-generator.ts
  │     │     └── logger.ts
  ├── tests/
  │     ├── ui/
  │     │     └── ecommerce.spec.ts
  ├── cleanup.js
  ├── playwright.config.ts
  ├── README.md
  └── package.json
```

## Prerequisites

*  Node.js (>=16.x)
*  TypeScript
*  Playwright (`@playwright/test`)
*  Allure Report

## Configuration

Environment-specific configurations are located in the `config/` directory. Example:

```json
{
  "baseURL": "[https://ecommerce.yosemiteint.com/prestashop/](https://ecommerce.yosemiteint.com/prestashop/)",
  "username": "devUser",
  "password": "devPassword"
}
```
## Installation

1. Clone the repository:
  ```bash
   git clone <repository_url>
   cd playwright-template-framework
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

1. Clean the project:
   ```bash
   npm run clean
   ```

2. Run all tests:
   ```bash
   npm test
   ```

3. Run tests with tags (e.g., `@smoke`):
   ```bash
   npx playwright test --grep "@smoke"
   ```

4. Run Tests for a Specific Environment
   ```bash
   ENV=dev npx playwright test
   ```

## Reporting

1. Generate and view Allure report:
   ```bash
   npm run allure:generate
   npm run allure:open
   ```

2. View Playwright HTML report:
   ```bash
   npx playwright show-report
   ```
3. Cleanup

Automatically clean artifacts before running tests:

  ```bash
  npm run clean
  ```

## Configuration

Environment-specific configurations are available in the `/config` directory:
- `dev.json`
- `staging.json`
- `prod.json`

To specify the environment, use:
```
ENV=staging npm test
```

## Improvements

- Add CI/CD pipeline for automated testing.
- Enhance logging to include more detailed test steps.
- Implement retries for flaky tests.
- Refactor for better modularity and reusability.

## License

This project is licensed under the ISC License.