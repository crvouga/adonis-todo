import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  async respond(ctx: HttpContext) {
    const { email, password } = ctx.request.body()

    const user = await User.query()
      .select(['id', 'email', 'password'])
      .where('email', email)
      .first()

    if (!user) {
      return ctx.inertia.render('auth/login', { error: 'Invalid credentials' })
    }

    const isValidPassword = await hash.verify(user.password, password)
    if (!isValidPassword) {
      return ctx.inertia.render('auth/login', { error: 'Invalid credentials' })
    }

    await ctx.auth.use('web').login(user)

    return ctx.response.status(302).redirect('/home')
  }
}
