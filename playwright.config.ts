import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: false,
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3000',
    launchOptions: {
      executablePath: '/snap/bin/brave',
      args: ['--no-sandbox']
    }
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true
  }
});
