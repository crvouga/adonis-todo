import User from '#models/user'
import { RegisterErrorCode } from '#shared/auth/register_error_code'
import { RegisterPageProps } from '#shared/auth/register_page_props'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Logger } from '@adonisjs/core/logger'
import { DateTime } from 'luxon'

@inject()
export default class RegisterPageController {
  constructor(protected logger: Logger) {}

  async get(ctx: HttpContext) {
    return renderRegisterPage(ctx, {})
  }

  async post(ctx: HttpContext) {
    const { email, password, passwordConfirmation } = ctx.request.body()

    if (password !== passwordConfirmation) {
      return renderRegisterPage(ctx, {
        errorCode: RegisterErrorCode.REGISTER_ERROR_CODE.PASSWORD_MISMATCH,
      })
    }

    try {
      const user = await User.create({
        email,
        password,
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
        return renderRegisterPage(ctx, {
          errorCode: RegisterErrorCode.REGISTER_ERROR_CODE.EMAIL_TAKEN,
        })
      }

      return renderRegisterPage(ctx, {
        errorCode: RegisterErrorCode.REGISTER_ERROR_CODE.UNKNOWN,
      })
    }
  }
}

function renderRegisterPage(ctx: HttpContext, props: RegisterPageProps) {
  return ctx.inertia.render('auth/register', props)
}
