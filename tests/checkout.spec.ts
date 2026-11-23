import { test, expect, Page } from '@playwright/test';

async function login(page: Page, user = 'standard_user') {
  await page.goto('/');
  await page.getByTestId('username').fill(user);
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
}

test('adding an item updates the cart badge', async ({ page }) => {
  await login(page);
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('standard user can complete a purchase', async ({ page }) => {
  await login(page);
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click();
  await page.getByTestId('checkout').click();
  await page.getByTestId('firstName').fill('Queenie');
  await page.getByTestId('lastName').fill('Phan');
  await page.getByTestId('postalCode').fill('LS12 3SS');
  await page.getByTestId('continue').click();
  await page.getByTestId('finish').click();
  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});

test('checkout with an empty first name shows an error', async ({ page }) => {
  await login(page);
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click();
  await page.getByTestId('checkout').click();
  await page.getByTestId('continue').click();
  await expect(page.getByTestId('error')).toContainText('First Name is required');
});

test('problem_user: last name keeps what is typed', async ({ page }) => {
  test.fail(true, 'Known bug BUG-001: last name field does not keep input');
  await login(page, 'problem_user');
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click();
  await page.getByTestId('checkout').click();
  await page.getByTestId('lastName').fill('Phan');
  await expect(page.getByTestId('lastName')).toHaveValue('Phan');
});