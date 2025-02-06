import { test } from '@japa/runner'
import User from '#models/user'
import { DateTime } from 'luxon'
import { RegisterErrorCode } from '#shared/auth/register_error_code'
import hash from '@adonisjs/core/services/hash'

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
    response.assertInertiaPropsContains({
      errorCode: RegisterErrorCode.REGISTER_ERROR_CODE.EMAIL_TAKEN,
    })
  })

  test('should render error for password mismatch', async ({ client }) => {
    const response = await client.post('/register').withCsrfToken().withInertia().form({
      email: 'test@example.com',
      password: 'password123',
      passwordConfirmation: 'password1234',
    })
    response.assertStatus(200)
    response.assertInertiaComponent('auth/register')
    response.assertInertiaPropsContains({
      errorCode: RegisterErrorCode.REGISTER_ERROR_CODE.PASSWORD_MISMATCH,
    })
  })

  test('should hash password when creating new user', async ({ client, assert }) => {
    const email = `test-${Date.now()}@example.com`
    const password = 'password123'

    const response = await client.post('/register').withCsrfToken().withInertia().form({
      email,
      password,
      passwordConfirmation: password,
    })

    response.assertStatus(200)
    response.assertRedirectsTo('/home')

    const user = await User.findBy('email', email)
    if (!user) {
      throw new Error('User not found')
    }
    const isPasswordHashed = await hash.verify(user.password, password)

    // Password should be hashed and verifiable
    assert.isTrue(isPasswordHashed)
    // Raw password should not be stored
    assert.notEqual(user!.password, password)
  })
})
