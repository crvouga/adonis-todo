import User from '#models/user'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Home home', () => {
  test('should render home page successfully', async ({ client }) => {
    const response = await client.get('/home')
    response.assertStatus(200)
  })

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

  test('render logout menu button when authenticated', async ({ visit, browserContext }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/home')
    await page.waitForSelector('button:has-text("Logout")')
  })

  test('redirects to login after clicking logout button', async ({ visit, browserContext }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/home')
    await page.click('button:has-text("Logout")')
    await page.waitForURL('/login')
    await page.assertPath('/login')
  })

  test('after logging out it prevents access to home page', async ({ visit, browserContext }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/home')
    await page.click('button:has-text("Logout")')
    await page.waitForURL('/login')
    await page.assertPath('/login')
    await page.goBack()
    await page.waitForURL('/login')
    await page.assertPath('/login')
  })

  test('renders todo lists associated with logged in user', async ({ visit, browserContext }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/home')
    await page.waitForSelector('[data-testid="todo-list-cards"]')
  })
})
