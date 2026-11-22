// End-to-end tests for the key flows (see e2e/). Runs against BASE_URL, or starts the
// production server (`npm run start`, after `npm run build`) on http://localhost:3000.
//
//   npm run build && npm run test:e2e
//   BASE_URL=https://ymsstudio.id npm run test:e2e   (read-only checks against the live site)
//
// Sending a real brief writes a lead to the database, so that test only runs with E2E_WRITE=1.
import { defineConfig, devices } from "@playwright/test"

const baseURL = process.env.BASE_URL || "http://localhost:3000"

export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npm run start", url: baseURL, reuseExistingServer: true, timeout: 180_000 },
})
