import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 60_000,
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:5000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: process.env.PW_NO_SERVER ? undefined : {
    command: process.env.PW_DEV_CMD || 'npm run dev',
    url: process.env.BASE_URL || 'http://127.0.0.1:5000',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});