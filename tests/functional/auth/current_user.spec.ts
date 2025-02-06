import { test } from '@japa/runner'
import User from '#models/user'
import { DateTime } from 'luxon'

test.group('Auth current user', () => {
  test('should return null when logged out', async ({ client, assert }) => {
    const response = await client.get('/current-user')
    response.assertStatus(200)
    assert.deepEqual(response.body(), {})
  })

  test('should return user data when logged in', async ({ client, assert }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    const response = await client.get('/current-user').loginAs(user)
    response.assertStatus(200)
    assert.containsSubset(response.body(), { user: { id: user.id, email: user.email } })
  })
})
