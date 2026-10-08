# 🎭 Playwright E-Commerce Test Automation Framework

> End-to-end UI and API test automation framework built with Playwright and TypeScript, demonstrating automated testing of the SauceDemo e-commerce application and REST APIs.
[![Playwright Tests](https://github.com/Nenyeblac/playwright-ecommerce-test-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/Nenyeblac/playwright-ecommerce-test-automation-framework/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-1.60-green.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-runtime-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## 🚀 Overview

This project is a Playwright and TypeScript test automation framework designed to demonstrate end-to-end UI and API testing practices for e-commerce applications.

The framework includes automated tests for the SauceDemo web application as well as REST API testing, covering key functional scenarios such as authentication, product management, shopping cart operations, checkout workflows, and API resource validation.

Key capabilities demonstrated in this project include:

- **Page Object Model (POM):** Reusable page objects for maintainable and scalable UI automation.
- **Comprehensive Test Coverage:** 50+ automated UI and API test scenarios covering critical user journeys and negative scenarios.
- **API Testing:** REST API validation covering authentication, products, carts, and users.
- **Cross-Browser Testing:** Test execution configured for Chromium, Firefox, and WebKit.
- **CI Integration:** Automated test execution using GitHub Actions on pushes and pull requests.
- **Multiple Test Reports:** HTML, JSON, JUnit, and console-based test reporting.
- **Failure Diagnostics:** Screenshots, videos, and Playwright traces configured to assist with debugging test failures.
- **Parallel Execution:** Playwright parallel test execution with configurable workers.
- **Environment Configuration:** Environment variables managed using dotenv.

## ✨ Key Features
- **Page Object Model (POM)** – Separates page-specific locators and interactions from test logic to improve maintainability and reusability.

- **UI Test Automation** – Covers key SauceDemo user journeys including authentication, product interactions, shopping cart functionality, checkout, and end-to-end purchase flows.

- **API Test Automation** – Validates REST API functionality including authentication, products, carts, users, HTTP status codes, response structures, and CRUD operations.

- **Cross-Browser Testing** – Supports test execution across Chromium, Firefox, and WebKit.

- **Parallel Test Execution** – Uses Playwright's parallel execution capabilities to reduce overall test execution time.

- **Reusable Test Data** – Uses structured test data and environment variables to separate test data and configuration from test logic.

- **Multiple Reporting Formats** – Generates HTML, JSON, JUnit, and console reports for test result analysis.

- **Failure Diagnostics** – Captures screenshots and videos on failure, with Playwright traces available on the first retry for debugging.

- **CI Integration** – Uses GitHub Actions to automatically execute the Playwright test suite on configured pushes and pull requests.

- **Multi-Environment Configuration** – Uses environment variables and `dotenv` to support configurable application and API settings.

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Playwright** | Browser automation and end-to-end UI/API testing |
| **TypeScript** | Programming language used to develop the test framework |
| **Node.js** | JavaScript runtime environment used to execute the project tooling |
| **npm** | Package management and test script execution |
| **GitHub Actions** | Continuous Integration (CI) and automated test execution |
| **dotenv** | Environment variable management |
| **HTML, JSON & JUnit Reports** | Test execution reporting and result integration |

## 📋 Prerequisites

Before running this project, ensure the following are installed:

- **Node.js**
- **npm**
- **Git**

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nenyeblac/playwright-ecommerce-test-automation-framework.git
```

### 2. Navigate to the project directory

```bash
cd playwright-ecommerce-test-automation-framework
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```

### 5. Configure environment variables

Create a `.env` file in the project root using `.env.example` as a template, then provide the required local configuration values.

> **Note:** The `.env` file is excluded from version control to prevent sensitive configuration values from being committed.

### 6. Run the tests

```bash
npx playwright test
```

### 7. View the HTML test report

```bash
npx playwright show-report
```

## 📁 Project Structure

```text
playwright-ecommerce-test-framework/
│
├── .github/
│   └── workflows/
│
├── page-objects/
│   ├── saucedemo/
│   └── BasePage.ts
│
├── test-data/
│
├── tests/
│   ├── api/
│   └── saucedemo/
│
├── types/
│   ├── Cart.ts
│   └── Product.ts
│
├── utils/
│
├── .env.example
├── .gitignore
├── LICENCE
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

### Directory Responsibilities

| Path | Purpose |
|------|---------|
| **`.github/workflows/`** | Contains the GitHub Actions workflow used for continuous integration and automated test execution. |
| **`page-objects/`** | Contains Page Object Model classes that separate page interactions and locators from test logic. |
| **`page-objects/saucedemo/`** | Contains page objects specific to the SauceDemo application. |
| **`page-objects/BasePage.ts`** | Shared page foundation inherited by the SauceDemo page objects for base-URL navigation and common locator interactions. |
| **`test-data/`** | Contains reusable test data used by automated tests. |
| **`tests/api/`** | Contains API test specifications. |
| **`tests/saucedemo/`** | Contains automated UI tests for the SauceDemo application. |
| **`types/`** | Contains TypeScript type definitions/interfaces for test data and API objects such as products and carts. |
| **`utils/`** | Contains reusable helper functions and test-data utilities. |
| **`.env.example`** | Provides a template showing the environment variables required by the framework without exposing real values. |
| **`playwright.config.ts`** | Defines Playwright configuration including test execution, browsers, retries, reporters, and test artefacts. |
| **`package.json`** | Defines project metadata, dependencies, and npm scripts. |
| **`tsconfig.json`** | Defines TypeScript compiler configuration. |

## 🧪 Test Scenarios

The framework covers UI and API scenarios across multiple areas of the applications under test.

### SauceDemo UI Testing

- Authentication with valid and invalid credentials
- Login validation and error handling
- Locked-out user behaviour
- Product inventory validation
- Product sorting
- Product information and pricing validation
- Shopping cart operations
- Adding and removing products
- Cart quantity validation
- Checkout information validation
- Checkout overview and price calculations
- Complete end-to-end purchase workflow
- Navigation and application behaviour
- Negative and security-oriented login scenarios including SQL injection and XSS input validation

### API Testing

- Authentication requests
- Product retrieval and validation
- Product category validation
- Cart operations
- User resource validation
- HTTP response status validation
- Response body and data structure validation
- CRUD operation testing
- Positive and negative API scenarios

## ▶️ Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests using the Playwright UI:

```bash
npx playwright test --ui
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

Run tests on a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run a specific test file:

```bash
npx playwright test path/to/test-file.spec.ts
```

View the HTML report after test execution:

```bash
npx playwright show-report
```

## ⚙️ Configuration

The framework is configured through `playwright.config.ts` and environment variables.

### Test Execution

- Tests are located in the `tests/` directory.
- Test files can run in parallel using Playwright's parallel execution.
- Tests are retried **twice on CI** and are not retried during local execution.
- CI execution uses **one worker**, while local execution uses Playwright's default worker configuration.
- `test.only` is prevented on CI to avoid accidentally running an incomplete test suite.

### Timeouts

| Setting | Value |
|---------|-------|
| Test timeout | 30 seconds |
| Assertion timeout | 5 seconds |
| Action timeout | 10 seconds |
| Navigation timeout | 30 seconds |

### Browser Projects

The framework is configured with the following Playwright projects:

- **API** – Executes API-specific tests.
- **Chromium** – Executes SauceDemo UI tests using Desktop Chrome configuration.
- **Firefox** – Executes UI tests using Desktop Firefox configuration.
- **WebKit** – Executes UI tests using Desktop Safari configuration.

### Test Artefacts

The framework captures diagnostic artefacts to help investigate test failures:

- **Screenshots** – Captured when a test fails.
- **Videos** – Retained when a test fails.
- **Traces** – Collected on the first retry of a failed test.

### Environment Variables

Environment-specific values and SauceDemo test credentials are managed using `dotenv`.

The repository includes an `.env.example` template showing the required variables without exposing actual credentials. Create a local `.env` file based on this template before running tests that depend on these values.

## 📊 Test Reporting

The framework supports multiple Playwright reporting formats for both human-readable test analysis and machine-readable CI results.

| Reporter | Purpose |
|----------|---------|
| **HTML** | Provides an interactive HTML report for reviewing test execution results. |
| **List** | Displays test results directly in the terminal during execution. |
| **JSON** | Generates structured test results in `test-result.json`. |
| **JUnit** | Generates test results in `results.xml` for CI/tool integration. |

To open the HTML report after test execution:

```bash
npx playwright show-report
```

The GitHub Actions workflow also uploads the generated Playwright HTML report as a workflow artefact and retains it for **30 days**.

## 🔄 Continuous Integration

The project uses GitHub Actions to automatically execute the Playwright test suite.

The workflow is triggered on:

- Pushes to the `main` or `master` branch.
- Pull requests targeting the `main` or `master` branch.

The CI workflow:

1. Checks out the repository.
2. Sets up the latest LTS version of Node.js.
3. Installs project dependencies using `npm ci`.
4. Installs Playwright browsers and required system dependencies.
5. Executes the Playwright test suite.
6. Uploads the Playwright HTML report as a GitHub Actions artefact.

The test report is retained for **30 days** and is uploaded even when test execution fails, unless the workflow is cancelled.

## 🎯 Framework Design & Best Practices

The framework demonstrates a structured approach to test automation with an emphasis on maintainability, reusability, and separation of concerns.

- **Page Object Model (POM)** – SauceDemo page interactions and locators are organised into dedicated page object classes including `LoginPage`, `ProductsPage`, `CartPage`, and `CheckoutPage`.

- **Separation of Test Logic and Page Interactions** – Test specifications focus on test scenarios and assertions, while reusable browser interactions are encapsulated within page objects.

- **Reusable Locators and Methods** – Common page elements and actions are defined once within page object classes and reused across multiple tests.

- **Centralised Test Data** – Reusable users, product information, checkout data, URLs, and other test values are organised separately from individual test scenarios.

- **Environment-Based Configuration** – `dotenv` and environment variables are used to support configurable URLs and SauceDemo user credentials.

- **TypeScript Type Safety** – Custom `Product` and `Cart` interfaces define expected API object structures and improve type safety when working with API responses.

- **Positive and Negative Testing** – The test suite covers both expected user behaviour and invalid/error scenarios.

- **Independent Test Organisation** – UI and API tests are separated into dedicated directories, making the framework easier to navigate and maintain.

- **Cross-Browser Validation** – UI tests can be executed against Chromium, Firefox, and WebKit through Playwright projects.

- **Failure Investigation Support** – Screenshots, videos, traces, and multiple report formats provide diagnostic information when tests fail.

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome. If you would like to contribute, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the `LICENCE` file for details.

## 👤 Author

**Chinenye Iloegbunam**

QA Automation Engineer focused on building maintainable and reliable automated testing solutions.

- GitHub: [Nenyeblac](https://github.com/Nenyeblac)
- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/chinenye-iloegbunam-284779154/)
