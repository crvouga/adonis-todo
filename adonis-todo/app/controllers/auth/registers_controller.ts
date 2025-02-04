import type { HttpContext } from '@adonisjs/core/http'
import { createHash } from 'node:crypto'
import db from '@adonisjs/lucid/services/db'

export default class RegistersController {
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
      await db.table('users').insert({
        email,
        password: hashedPassword,
        created_at: new Date(), // Add created_at timestamp
      })

      // Redirect to login
      return ctx.response.redirect('/home')
    } catch (error) {
      // Log the full error for debugging
      console.error('Registration error:', {
        error: error,
        message: error.message,
        code: error.code,
        stack: error.stack,
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
