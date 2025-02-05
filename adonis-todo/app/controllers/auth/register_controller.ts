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
        errorCode: REGISTER_ERROR_CODE.PASSWORD_MISMATCH,
      })
    }

    try {
      const hashedPassword = createHash('sha256').update(password).digest('hex')

      const user = await User.create({
        email,
        password: hashedPassword,
        createdAt: DateTime.now(),
      })

      await ctx.auth.use('web').login(user)

      return ctx.response.redirect('/home')
    } catch (error) {
      const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error))
      this.logger.error('Registration error:', {
        error: error.toString(),
        message: error.message,
        code: error.code,
        stack: error.stack,
        details: errorDetails,
      })

      if (error.code === 'ER_DUP_ENTRY' || error.message.includes('UNIQUE constraint failed')) {
        return ctx.inertia.render('auth/register', {
          errorCode: REGISTER_ERROR_CODE.EMAIL_TAKEN,
        })
      }

      return ctx.inertia.render('auth/register', {
        errorCode: REGISTER_ERROR_CODE.UNKNOWN,
      })
    }
  }
}

export const REGISTER_ERROR_CODE = {
  EMAIL_TAKEN: 'EMAIL_TAKEN',
  PASSWORD_MISMATCH: 'PASSWORD_MISMATCH',
  UNKNOWN: 'UNKNOWN',
}

export function toRegisterErrorMessage(code: keyof typeof REGISTER_ERROR_CODE): string {
  switch (code) {
    case 'EMAIL_TAKEN':
      return 'An account with this email already exists. Please use a different email or try logging in.'
    case 'PASSWORD_MISMATCH':
      return 'Passwords do not match. Please make sure both passwords are identical.'
    case 'UNKNOWN':
      return 'Sorry, we encountered an error while creating your account. Please try again later or contact support if the problem persists.'
  }
}
