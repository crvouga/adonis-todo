import { test } from '@japa/runner'

test.group('Auth login', () => {
  test('should render login page successfully', async ({ client }) => {
    const response = await client.get('/login')
    response.assertStatus(200)
  })

  test('should display login form', async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('http://localhost:3333/login')
    await page.assertExists('form')
    await page.assertExists('input[type="email"]')
    await page.assertExists('input[type="password"]')
    await page.assertExists('button[type="submit"]')
  })

  test('should show error when logging in with unregistered account', async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('http://localhost:3333/login')

    await page.locator('input[type="email"]').fill('nonexistent@example.com')
    await page.locator('input[type="password"]').fill('password123')
    await page.locator('button[type="submit"]').click()

    await page.assertExists('[role="alert"]')
    await page.assertTextContains('[role="alert"]', 'Invalid credentials')
  })

  test('should display register link', async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('http://localhost:3333/login')
    await page.assertExists('a[href="/register"]')
    await page.assertTextContains('a[href="/register"]', 'Register')
  })
})
