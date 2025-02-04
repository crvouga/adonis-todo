import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async respond(ctx: HttpContext) {
    return ctx.inertia.render('auth/login', {
      error: 'Invalid credentials',
    })
  }
}
