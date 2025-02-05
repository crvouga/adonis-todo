import { isLoading, Loading, RemoteResult, unwrapOr } from '#shared/result/result'
import { UserDTO } from '#shared/user/user'
import { useEffect, useState } from 'react'
import { useAuthApi } from './use_auth_api'

export const useCurrentUser = () => {
  const authApi = useAuthApi()
  const [state, setState] = useState<RemoteResult<UserDTO, string>>(Loading)

  const load = async () => {
    setState(Loading)
    const result = await authApi.getCurrentUser()
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
