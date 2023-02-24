import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../tests',
  outputDir: '../reports/test-result',
  timeout: 30 * 1000,
  expect: {   
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', {outputFolder: '../reports/report', open: 'on-failure'}]],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    actionTimeout: 0,
    trace: 'on',
  },
});
