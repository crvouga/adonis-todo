import User from '#models/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Logger } from '@adonisjs/core/logger'
import { DateTime } from 'luxon'
import { createHash } from 'node:crypto'

@inject()
export default class RegisterController {
  constructor(protected logger: Logger) {}

  async respond(ctx: HttpContext) {
    const { email, password, passwordConfirmation } = ctx.request.body()

    if (password !== passwordConfirmation) {
      return ctx.inertia.render('auth/register', {
        error: 'Passwords do not match. Please make sure both passwords are identical.',
      })
    }

    try {
      // Hash password
      const hashedPassword = createHash('sha256').update(password).digest('hex')

      // Create user
      const user = await User.create({
        email,
        password: hashedPassword,
        createdAt: DateTime.now(),
      })

      // Login the user
      await ctx.auth.use('web').login(user)

      // Redirect to home
      return ctx.response.redirect('/home')
    } catch (error) {
      // Log the full error for debugging
      const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error))
      console.error('Registration error:', {
        error: error.toString(),
        message: error.message,
        code: error.code,
        stack: error.stack,
        details: errorDetails,
      })

      // Check if error is due to duplicate email
      if (error.code === 'ER_DUP_ENTRY' || error.message.includes('UNIQUE constraint failed')) {
        return ctx.inertia.render('auth/register', {
          error:
            'An account with this email already exists. Please use a different email or try logging in.',
        })
      }

      return ctx.inertia.render('auth/register', {
        error:
          'Sorry, we encountered an error while creating your account. Please try again later or contact support if the problem persists.',
      })
    }
  }
}
