import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class HomeController {
  async get(ctx: HttpContext) {
    const isLoggedIn = await ctx.auth.use('web').check()
    if (!isLoggedIn) {
      return ctx.response.redirect('/login')
    }
    return ctx.inertia.render('home')
  }
}
