import TodoList from '#models/todo_list'
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
    await page.waitForURL('/home')
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

  test('clicking create todo list button opens create form page', async ({
    visit,
    browserContext,
  }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/home')
    await page.click('[data-testid="create-todo-list-button"]')
    await page.waitForURL('/todo-lists/create')
    await page.assertPath('/todo-lists/create')
  })

  test('renders link to todo list page and redirects when clicked', async ({
    visit,
    browserContext,
  }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    const todoList = await TodoList.create({
      title: 'My Todo List',
      ownerUserId: user.id,
      createdAt: DateTime.now(),
    })
    await browserContext.loginAs(user)
    const page = await visit('/home')
    await page.waitForSelector('[data-testid="todo-list-cards"]')
    const card = page.locator('[data-testid="todo-list-cards"] a').first()
    await card.click()
    await page.waitForURL(`/todo-lists/${todoList.id}`)
    await page.assertPath(`/todo-lists/${todoList.id}`)
  })
})
