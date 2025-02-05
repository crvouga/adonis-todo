import User from '#models/user'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Auth redirect', () => {
  test('redirects to home when visiting login page while authenticated', async ({
    visit,
    browserContext,
  }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/login')
    await page.waitForURL('/home')
    await page.assertPath('/home')
  })

  test('redirects to home when visiting register page while authenticated', async ({
    visit,
    browserContext,
  }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/register')
    await page.waitForURL('/home')
    await page.assertPath('/home')
  })
})
