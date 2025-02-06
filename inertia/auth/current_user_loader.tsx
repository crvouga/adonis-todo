import { isLoading, Loading, RemoteResult, unwrapOr } from '#shared/result/result'
import { UserDTO } from '#shared/user/user_dto'
import { useEffect, useState } from 'react'
import { useAppCtx } from '~/app/app_ctx'

export const useCurrentUser = () => {
  const appCtx = useAppCtx()
  const [state, setState] = useState<RemoteResult<UserDTO, string>>(Loading)

  const load = async () => {
    setState(Loading)
    const result = await appCtx.authApi.getCurrentUser()
    setState(result)
  }

  useEffect(() => {
    load()
  }, [])

  return {
    state,
    isLoading: isLoading(state),
    currentUser: unwrapOr(state, null),
  }
}
