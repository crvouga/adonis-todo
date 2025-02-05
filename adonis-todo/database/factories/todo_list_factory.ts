import factory from '@adonisjs/lucid/factories'
import TodoList from '#models/todo_list'
import { DateTime } from 'luxon'

export const TodoListFactory = factory
  .define(TodoList, async ({ faker }) => {
    return {
      title: faker.lorem.words(3),
      ownerUserId: 1,
      createdAt: DateTime.fromJSDate(faker.date.past()),
      updatedAt: DateTime.fromJSDate(faker.date.past()),
    }
  })
  .build()
