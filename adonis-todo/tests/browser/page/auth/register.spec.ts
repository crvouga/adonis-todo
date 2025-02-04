import { test } from '@japa/runner'

test.group('Auth register', () => {
  test('should render register page successfully', async ({ client }) => {
    const response = await client.get('/register')
    response.assertStatus(200)
  })

  test('should display register form', async ({ visit }) => {
    const page = await visit('/register')
    await page.assertExists('form')
    await page.assertExists('input[type="email"]')
    await page.assertExists('input[type="password"]')
    await page.assertExists('input[name="passwordConfirmation"]')
    await page.assertExists('button[type="submit"]')
  })

  test('should register without errors', async ({ visit }) => {
    const page = await visit('/register')

    // Generate unique email using timestamp
    const uniqueEmail = `test-${Date.now()}@example.com`

    await page.locator('input[type="email"]').fill(uniqueEmail)
    await page
      .locator('input[type="password"]:not([name="passwordConfirmation"])')
      .fill('password123')
    await page.locator('input[name="passwordConfirmation"]').fill('password123')
    await page.locator('button[type="submit"]').click()

    // wait for form to be submitted
    await page.waitForTimeout(500)

    await page.assertNotExists('[role="alert"][aria-label="Error"]')
  })

  test('should redirect to home page after successful registration', async ({ visit }) => {
    const page = await visit('/register')

    const uniqueEmail = `test-${Date.now()}@example.com`

    await page.locator('input[type="email"]').fill(uniqueEmail)
    await page
      .locator('input[type="password"]:not([name="passwordConfirmation"])')
      .fill('password123')
    await page.locator('input[name="passwordConfirmation"]').fill('password123')
    await page.locator('button[type="submit"]').click()
    await page.waitForURL('/home')
    await page.assertPath('/home')
  })
})
