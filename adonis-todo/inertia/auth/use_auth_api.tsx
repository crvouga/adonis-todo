import { useAppCtx } from '~/app/app_ctx'
import { IAuthApi } from './auth_api'

export const useAuthApi = (): IAuthApi => {
  const appContext = useAppCtx()
  return appContext.authApi
}
