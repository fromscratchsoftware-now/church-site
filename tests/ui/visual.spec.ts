import { test, expect } from '@playwright/test';

async function disableAnimations(page: any) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after { 
        transition: none !important; 
        animation: none !important; 
        scroll-behavior: auto !important;
      }
    `,
  });
}

async function setTheme(page: any, mode: 'light' | 'dark') {
  // Avoid UI-click flakiness: set next-themes storage key directly.
  await page.evaluate((m) => {
    localStorage.setItem('theme', m);
  }, mode);
}

async function gotoPath(page: any, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
}

async function gotoWithTheme(page: any, path: string, mode: 'light' | 'dark') {
  // First load, then set theme and reload to ensure the app hydrates with it.
  await gotoPath(page, path);
  await disableAnimations(page);
  await setTheme(page, mode);
  await gotoPath(page, path);
  await disableAnimations(page);
}

test.describe('Mobile visual regression', () => {
  test('Home hero CTAs (light/dark)', async ({ page }) => {
    await gotoWithTheme(page, '/', 'light');
    await expect(page).toHaveScreenshot('home-hero-light.png');

    await gotoWithTheme(page, '/', 'dark');
    await expect(page).toHaveScreenshot('home-hero-dark.png');
  });

  test('Plan Your Visit cards (light/dark)', async ({ page }) => {
    await gotoWithTheme(page, '/#visit', 'light');
    await expect(page).toHaveScreenshot('visit-cards-light.png');

    await gotoWithTheme(page, '/#visit', 'dark');
    await expect(page).toHaveScreenshot('visit-cards-dark.png');
  });

  test('Contact section + form contrast (light/dark)', async ({ page }) => {
    await gotoWithTheme(page, '/#contact', 'light');
    await expect(page).toHaveScreenshot('contact-light.png');

    await gotoWithTheme(page, '/#contact', 'dark');
    await expect(page).toHaveScreenshot('contact-dark.png');
  });
});
