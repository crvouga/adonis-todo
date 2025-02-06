import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class HomeController {
  async get(ctx: HttpContext) {
    return ctx.inertia.render('home')
  }
}
