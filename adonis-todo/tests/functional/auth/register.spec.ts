import { test } from '@japa/runner'
import { REGISTER_ERROR_CODE } from '#controllers/auth/register_controller'
import User from '#models/user'
import { DateTime } from 'luxon'

test.group('Auth register', () => {
  test('should render register page', async ({ client }) => {
    const response = await client.get('/register').withCsrfToken().withInertia()
    response.assertStatus(200)
    response.assertInertiaComponent('auth/register')
  })

  test('should render register page with error for email taken', async ({ client }) => {
    const email = `test-${Date.now()}@example.com`
    await User.create({
      email,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    const response = await client.post('/register').withCsrfToken().withInertia().form({
      email,
      password: 'password123',
      passwordConfirmation: 'password123',
    })
    response.assertStatus(200)
    response.assertInertiaComponent('auth/register')
    response.assertInertiaPropsContains({ errorCode: REGISTER_ERROR_CODE.EMAIL_TAKEN })
  })

  test('should render error for password mismatch', async ({ client }) => {
    const response = await client.post('/register').withCsrfToken().withInertia().form({
      email: 'test@example.com',
      password: 'password123',
      passwordConfirmation: 'password1234',
    })
    response.assertStatus(200)
    response.assertInertiaComponent('auth/register')
    response.assertInertiaPropsContains({ errorCode: REGISTER_ERROR_CODE.PASSWORD_MISMATCH })
  })
})
