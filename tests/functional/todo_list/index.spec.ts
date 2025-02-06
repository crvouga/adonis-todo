import { test } from '@japa/runner'
import { UserFactory } from '#factories/user_factory'
import { TodoListFactory } from '#factories/todo_list_factory'

test.group('Todo list index', () => {
  test('renders todo list page', async ({ client }) => {
    const user = await UserFactory.create()
    const todoList = await TodoListFactory.merge({ ownerUserId: user.id }).create()

    const response = await client
      .get(`/todo-lists/${todoList.id}`)
      .loginAs(user)
      .withInertia()
      .withCsrfToken()

    response.assertStatus(200)
    response.assertInertiaComponent('todo-lists/index')
    response.assertInertiaPropsContains({
      todoList: {
        id: todoList.id,
        title: todoList.title,
        ownerUserId: todoList.ownerUserId,
      },
    })
  })
})
