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
})
