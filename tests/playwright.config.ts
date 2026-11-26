import { defineConfig } from '@playwright/test';
import path from 'node:path';

// SITE_DIR is the built site to test: ../_site for Jekyll, ../public for Hugo.
const siteDir = path.resolve(__dirname, process.env.SITE_DIR ?? '../_site');
const port = 4321;

export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: `http://localhost:${port}` },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    command: `python3 serve.py "${siteDir}" ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !process.env.CI,
  },
});
