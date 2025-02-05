import { fromUnknownError, Ok, type Result } from '#shared/result/result'
import { UserDTO } from '#shared/user/user'
import vine from '@vinejs/vine'

export type IAuthApi = {
  getCurrentUser: () => Promise<Result<UserDTO, string>>
}

export const AuthApi = (): IAuthApi => {
  return {
    async getCurrentUser() {
      try {
        const response = await fetch('/current-user')
        const data = await response.json()
        const user = await vine.validate({
          data: {
            id: data.user.id,
            email: data.user.email,
          },
          schema: UserDTO,
        })
        return Ok(user)
      } catch (error) {
        return fromUnknownError(error)
      }
    },
  }
}
