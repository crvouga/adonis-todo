import User from '#models/user'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Home home', () => {
  test('should render home page successfully', async ({ client }) => {
    const response = await client.get('/home')
    response.assertStatus(200)
  })

  // test.todo('should display home page content', async ({ browser }) => {
  //   const page = await browser.newPage()
  //   await page.goto('/home')
  //   await page.assertExists('main')
  // })

  test('redirect to login page when not authenticated', async ({ visit }) => {
    const page = await visit('/home')
    await page.waitForURL('/login')
    await page.assertPath('/login')
  })

  test('renders home page when authenticated', async ({ visit, browserContext }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/home')
    await page.waitForURL('/home')
    await page.assertPath('/home')
  })
})
