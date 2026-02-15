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

  test('Navbar scrolled state (light/dark)', async ({ page }) => {
    await gotoWithTheme(page, '/', 'light');
    await page.evaluate(() => window.scrollTo(0, 220));
    await page.waitForTimeout(250);
    await expect(page).toHaveScreenshot('navbar-scrolled-light.png');

    await gotoWithTheme(page, '/', 'dark');
    await page.evaluate(() => window.scrollTo(0, 220));
    await page.waitForTimeout(250);
    await expect(page).toHaveScreenshot('navbar-scrolled-dark.png');
  });

  test('Sermons section cards on home (light/dark)', async ({ page }) => {
    await gotoWithTheme(page, '/#sermons', 'light');
    await expect(page).toHaveScreenshot('home-sermons-light.png');

    await gotoWithTheme(page, '/#sermons', 'dark');
    await expect(page).toHaveScreenshot('home-sermons-dark.png');
  });

  test('Events section cards on home (light/dark)', async ({ page }) => {
    await gotoWithTheme(page, '/#events', 'light');
    await expect(page).toHaveScreenshot('home-events-light.png');

    await gotoWithTheme(page, '/#events', 'dark');
    await expect(page).toHaveScreenshot('home-events-dark.png');
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

  test('Events page grid (light/dark)', async ({ page }) => {
    await gotoWithTheme(page, '/events', 'light');
    await expect(page).toHaveScreenshot('events-page-light.png');

    await gotoWithTheme(page, '/events', 'dark');
    await expect(page).toHaveScreenshot('events-page-dark.png');
  });

  test('Sermons page grid (light/dark)', async ({ page }) => {
    await gotoWithTheme(page, '/sermons', 'light');
    await expect(page).toHaveScreenshot('sermons-page-light.png');

    await gotoWithTheme(page, '/sermons', 'dark');
    await expect(page).toHaveScreenshot('sermons-page-dark.png');
  });
});
