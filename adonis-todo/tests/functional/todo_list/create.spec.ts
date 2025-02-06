import { test } from '@japa/runner'
import User from '#models/user'
import { DateTime } from 'luxon'
import TodoList from '#models/todo_list'

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

  test('can create a new todo list', async ({ client }) => {
    const user = await User.create({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      createdAt: DateTime.now(),
    })

    const response = await client
      .post('/todo-lists/create')
      .withInertia()
      .withCsrfToken()
      .loginAs(user)
      .form({
        title: 'My New Todo List',
      })

    response.assertRedirectsTo('/home')
    await TodoList.findByOrFail('title', 'My New Todo List')
  })
})
