import { test, expect } from '@playwright/test';

test.describe('LEA UI Tests', () => {
  test('should load LEA application', async ({ page }) => {
    await page.goto('/index.html');
    
    // Check that the page title is correct
    const title = await page.locator('header h1');
    await expect(title).toBeVisible();
    expect(await title.textContent()).toContain('Learning Empowered Advisor');
  });

  test('should have Run Test button', async ({ page }) => {
    await page.goto('/index.html');
    
    // Check that Run Test button exists
    const runTestBtn = await page.locator('#runTestsBtn');
    await expect(runTestBtn).toBeVisible();
  });

  test('should run all regression tests and pass', async ({ page }) => {
    await page.goto('/index.html');
    
    // Click the Run Test button
    const runTestBtn = await page.locator('#runTestsBtn');
    await runTestBtn.click();
    
    // Wait for the modal to appear
    await page.waitForSelector('div:has-text("LEA Regression Tests")');
    
    // Check for success text
    const successText = await page.locator('text=10 tests');
    await expect(successText).toBeVisible();
    
    // Verify all 10 passed
    const passedText = await page.locator('text=Passed: 10');
    await expect(passedText).toBeVisible();
    
    // Verify no failures
    const failedText = await page.locator('text=Failed: 0');
    await expect(failedText).toBeVisible();
  });

  test('should navigate between tabs', async ({ page }) => {
    await page.goto('/index.html');
    
    // Check for phase tabs (they use tab-btn class)
    const tabs = await page.locator('.tab-btn').count();
    expect(tabs).toBeGreaterThan(0);
  });
});
