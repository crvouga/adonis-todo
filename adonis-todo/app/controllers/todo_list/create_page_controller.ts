import type { HttpContext } from '@adonisjs/core/http'

export default class TodoListCreatePageController {
  async get({ inertia }: HttpContext) {
    return inertia.render('todo-lists/create')
  }

  async post(_input: HttpContext) {
    throw new Error('Not implemented')
  }
}
