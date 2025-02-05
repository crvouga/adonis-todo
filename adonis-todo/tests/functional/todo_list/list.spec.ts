import { TodoListFactory } from '#factories/todo_list_factory'
import { UserFactory } from '#factories/user_factory'
import { test } from '@japa/runner'

test.group('Todo list list', () => {
  test('returns paginated todo lists', async ({ client }) => {
    const user = await UserFactory.create()
    const todoLists = await TodoListFactory.merge({ ownerUserId: user.id }).createMany(2)
    const response = await client.get('/api/todo-lists').qs({ page: 1, perPage: 10 }).loginAs(user)
    response.assertAgainstApiSpec()
    response.assertBodyContains({
      items: todoLists.map((list) => ({
        title: list.title,
        ownerUserId: user.id,
      })),
      page: 1,
      perPage: 10,
    })
  })
})
