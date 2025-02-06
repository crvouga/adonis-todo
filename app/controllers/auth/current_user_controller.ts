import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CurrentUserController {
  async respond(ctx: HttpContext) {
    const isLoggedIn = await ctx.auth.use('web').check()
    if (!isLoggedIn) return ctx.response.json({ user: null })
    const user = ctx.auth.use('web').user
    if (!user) return ctx.response.json({ user: null })
    return ctx.response.json({ user: { id: user.id, email: user.email } })
  }
}
