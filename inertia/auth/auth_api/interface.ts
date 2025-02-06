import { type Result } from '#shared/result/result'
import { UserDTO } from '#shared/user/user_dto'

export type IAuthApi = {
  getCurrentUser: () => Promise<Result<UserDTO, string>>
}
