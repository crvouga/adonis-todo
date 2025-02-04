import { test } from '@japa/runner'

test.group('Auth login', () => {
  test('should render login page successfully', async ({ visit }) => {
    const page = await visit('/login')
    await page.waitForURL('/login')
  })

  test('should display login form', async ({ visit }) => {
    const page = await visit('/login')
    await page.assertExists('form')
    await page.assertExists('input[type="email"]')
    await page.assertExists('input[type="password"]')
    await page.assertExists('button[type="submit"]')
  })

  test('should show error when logging in with unregistered account', async ({ visit }) => {
    const page = await visit('/login')
    await page.locator('input[type="email"]').fill('nonexistent@example.com')
    await page.locator('input[type="password"]').fill('password123')
    await page.locator('button[type="submit"]').click()
    await page.assertExists('[role="alert"]')
    await page.assertTextContains('[role="alert"]', 'Invalid credentials')
  })

  test('should display register link', async ({ visit }) => {
    const page = await visit('/login')
    await page.assertExists('a[href="/register"]')
    await page.assertTextContains('a[href="/register"]', 'Register')
  })
})
