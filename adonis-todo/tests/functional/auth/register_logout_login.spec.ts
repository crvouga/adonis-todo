import { test } from '@japa/runner'

test.group('Auth register, logout, login', () => {
  test('register then logout then login', async ({ client }) => {
    const email = `test-${Date.now()}@example.com`
    const password = 'password123'

    const registered = await client.post('/register').withCsrfToken().withInertia().form({
      email,
      password,
      passwordConfirmation: password,
    })
    registered.assertStatus(200)
    registered.assertRedirectsTo('/home')

    const loggedOut = await client.post('/logout').withCsrfToken().withInertia()
    loggedOut.assertStatus(200)
    loggedOut.assertRedirectsTo('/login')

    const loggedIn = await client.post('/login').withCsrfToken().withInertia().form({
      email,
      password,
    })
    loggedIn.assertStatus(200)
    loggedIn.assertRedirectsTo('/home')
  })
})
