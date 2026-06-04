import { defineConfig, devices } from '@playwright/test';

// Read environment variables from file. https://github.com/motdotla/dotenv 
import * as dotenv from 'dotenv';
import path from 'path';
// Load environment variables
dotenv.config();

// See https://playwright.dev/docs/test-configuration.

export default defineConfig({
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code. 
  forbidOnly: !!process.env.CI,

  // Retry on CI only 
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI. 
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use. See https://playwright.dev/docs/test-reporters 
  reporter: [

    ['html'],
    ['list'],
    ['json', {outputFile: 'test-result.json'}]
  ],

  // Global test timeout
  timeout: 30 * 1000, //30 seconds

  // Global expect timeout
  expect: {
    timeout: 5000 //5 seconds
  },
 
  // Shared settings for all projects
  use: {
    // Base URL - change based on which site you're testing
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    // Collect trace when retrying the failed test. 
    trace: 'on-first-retry',

    // Take screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on failure
    video: 'retain-on-failure',

    // Browser viewport
    viewport: {width: 1280, height: 720},

    // Action timeout
    actionTimeout: 10 * 1000, // 10 seconds

    // Navigation timeout
    navigationTimeout: 30 * 1000 //30 seconds
  },

  // Configure projects for major browsers 
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Test against mobile viewports.
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // Test against branded browsers. 
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
