import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  public async respond(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    ctx.inertia.clearHistory()
    return ctx.response.redirect('/login')
  }
}
