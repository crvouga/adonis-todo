import TodoList from '#models/todo_list'
import { TodoListDTO } from '#shared/todo_list/todo_list_dto'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Logger } from '@adonisjs/core/logger'

@inject()
export default class TodoListPageController {
  constructor(protected logger: Logger) {}

  async get({ inertia, request }: HttpContext) {
    this.logger.info('Rendering todo list')
    const todoList = await TodoList.findOrFail(request.param('id'))
    const todoListDTO: TodoListDTO = {
      id: todoList.id,
      title: todoList.title,
      ownerUserId: todoList.ownerUserId,
      createdAt: todoList.createdAt.toISO(),
      updatedAt: todoList.updatedAt?.toISO() ?? null,
    }
    return inertia.render('todo-lists/index', {
      todoList: todoListDTO,
    })
  }
}
