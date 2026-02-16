import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: {
    // Allow some variance across renderers while still catching real regressions.
    // WebKit/iOS can be slower to capture; increase screenshot timeout.
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled', timeout: 15_000 },
  },
  webServer: {
    command: 'npm run build && npx vite preview --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    baseURL: process.env.UI_BASE_URL || 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'android-chrome',
      use: {
        ...devices['Pixel 7'],
        // Ensure we run on Chromium explicitly for Android/Chrome coverage.
        browserName: 'chromium',
      },
    },
    {
      name: 'ios-safari',
      use: {
        ...devices['iPhone 14'],
        // WebKit approximates iOS Safari rendering in CI.
        browserName: 'webkit',
      },
    },
  ],
  reporter: [['list'], ['html', { open: 'never' }]],
});
