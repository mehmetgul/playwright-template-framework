
# Sample Playwright Framework

This is a comprehensive test automation framework built using Playwright for end-to-end (E2E), API, and visual testing. The framework is structured for scalability and maintainability, supporting advanced reporting and artifact management.

---

## Diagram


---

## Features

- End-to-End testing with Playwright.
- API testing support.
- Visual regression testing.
- Advanced reporting using Allure and Playwright HTML reports.
- Automated artifact cleanup (screenshots, videos, test results).
- Configurable environment support via `config/` directory.

---

## Prerequisites

- Node.js (>=16.x)
- TypeScript
- Playwright (`@playwright/test`)
- Allure Report

---

## Folder Structure

```
allure-results/
artifacts/
  ├── allure/
  │     ├── allure-results/
  │     └── allure-report/
  ├── playwright/
  │     ├── html-report/
  │     ├── logs/
  │     ├── screenshots/
  │     └── videos/
  ├── test-results/
config/
  ├── dev.json
  ├── staging.json
  └── prod.json
node_modules/
src/
  ├── api/
  ├── fixtures/
  ├── pageObjects/
tests/
.gitignore
cleanup.js
package.json
playwright.config.ts
README.md
tsconfig.json
```

---

## Configuration

Environment-specific configurations are located in the `config/` directory. Example:

```json
{
  "baseURL": "https://ecommerce.yosemiteint.com/prestashop/",
  "username": "devUser",
  "password": "devPassword"
}
```

---

## Running the Project

### Install Dependencies
```bash
npm install
```

### Clean Artifacts
```bash
npm run clean
```

### Run Tests
Run all tests:
```bash
npm run test
```

Run specific tests using tags:
```bash
npm run test -- --grep "@smoke"
```

---

## Generate Reports

### Allure Report
Generate and open the Allure report:
```bash
npm run allure:open
```

### HTML Report
Run tests and view the HTML report:
```bash
npx playwright show-report artifacts/playwright/html-report
```

---

## Artifacts Management

- **Screenshots**: Stored in `artifacts/playwright/screenshots`.
- **Videos**: Stored in `artifacts/playwright/videos`.
- **Test Results**: Stored in `artifacts/playwright/test-results`.

---

## Testing

### Running Tests Locally
```bash
npm run test
```

### Running Specific Test
```bash
npx playwright test --grep "@smoke"
```

---

## Cleanup

Automatically clean artifacts before running tests:
```bash
npm run clean
```

---

## License

This project is licensed under the ISC License.
