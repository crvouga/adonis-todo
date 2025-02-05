import TodoList from '#models/todo_list'
import { Paginated } from '#shared/pagination/paginated'
import { TodoListDTO } from '#shared/todo_list/todo_list_dto'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export default class TodoListListsController {
  async get({ request, response }: HttpContext) {
    const input = await vine.validate({
      schema: vine.object({
        page: vine.number(),
        perPage: vine.number(),
      }),
      data: request.qs(),
    })

    const todoLists = await TodoList.query().paginate(input.page, input.perPage)

    const paginatedTodoLists: Paginated<TodoListDTO> = {
      items: todoLists.map(
        (list): TodoListDTO => ({
          id: list.id,
          title: list.title,
          ownerUserId: list.ownerUserId,
          createdAt: DateTime.fromJSDate(list.createdAt.toJSDate()).toISO(),
          updatedAt: list.updatedAt ? DateTime.fromJSDate(list.updatedAt.toJSDate()).toISO() : null,
        })
      ),
      total: todoLists.total,
      page: todoLists.currentPage,
      perPage: todoLists.perPage,
      lastPage: todoLists.lastPage,
    }

    return response.json(paginatedTodoLists)
  }
}
