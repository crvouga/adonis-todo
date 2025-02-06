import { test } from '@japa/runner'
import User from '#models/user'
import { DateTime } from 'luxon'

test.group('Todo List Create', () => {
  test('should render form', async ({ visit, browserContext }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/todo-lists/create')
    await page.assertExists('form')
    await page.assertExists('input[type="text"]')
    await page.assertExists('button[type="submit"]')
  })

  test('should create list and redirect to list page', async ({ visit, browserContext }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)

    const page = await visit('/todo-lists/create')
    await page.locator('input[type="text"]').fill('My Todo List')
    await page.locator('button[type="submit"]').click()

    await page.waitForURL(/\/todo-lists\/\d+/)
    await page.assertTextContains('body', 'My Todo List')
  })
})
