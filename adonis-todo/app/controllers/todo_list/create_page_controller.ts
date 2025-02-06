import type { HttpContext } from '@adonisjs/core/http'
import TodoList from '#models/todo_list'
import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
@inject()
export default class TodoListCreatePageController {
  constructor(protected logger: Logger) {}

  async get({ inertia }: HttpContext) {
    this.logger.info('Rendering todo list create page')
    return inertia.render('todo-lists/create')
  }

  async post({ request, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      this.logger.error('User must be logged in')
      return response.unauthorized('User must be logged in')
    }

    this.logger.info('Creating new todo list', {
      userId: user.id,
    })

    const input = await vine.validate({
      schema: vine.object({
        title: vine.string(),
      }),
      data: request.body(),
    })

    this.logger.debug('Validated todo list input', { title: input.title })

    const created = await TodoList.create({
      title: input.title,
      ownerUserId: user.id,
    })

    this.logger.info('Created new todo list', {
      todoListId: created.id,
      title: created.title,
      userId: created.ownerUserId,
    })

    return response.status(302).redirect(`/todo-lists/${created.id}`)
  }
}
