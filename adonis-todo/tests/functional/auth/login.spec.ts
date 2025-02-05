import User from '#models/user'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Auth login', () => {
  test('should render login page with error for invalid credentials', async ({ client }) => {
    const response = await client.post('/login').withCsrfToken().withInertia().form({
      email: 'test@example.com',
      password: 'wrong-password',
    })

    response.assertStatus(200)
    response.assertInertiaComponent('auth/login')
    response.assertInertiaPropsContains({ error: 'Invalid credentials' })
  })

  test('should login user with valid credentials', async ({ client }) => {
    const email = `test-${Date.now()}@example.com`
    const password = 'password123'
    await User.create({
      email,
      password,
      createdAt: DateTime.now(),
    })

    const response = await client.post('/login').withCsrfToken().form({
      email,
      password,
    })
    response.assertRedirectsTo('/home')
  })
})
