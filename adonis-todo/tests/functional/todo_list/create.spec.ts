import { test } from '@japa/runner'
import User from '#models/user'
import { DateTime } from 'luxon'

test.group('Todo list create', () => {
  test('renders create todo list form', async ({ client }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })
    const response = await client.get('/todo-lists/create').loginAs(user).withInertia()
    response.assertStatus(200)
    response.assertInertiaComponent('todo-lists/create')
  })
})
