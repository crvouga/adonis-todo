import { createContext, useContext } from 'react'
import { AuthApi, IAuthApi } from '~/auth/auth_api'

export type IAppCtx = {
  authApi: IAuthApi
}

export const AppCtx = (): IAppCtx => {
  return {
    authApi: AuthApi(),
  }
}

const AppCtxContext = createContext<IAppCtx | null>(null)

export const AppCtxProvider = (props: { children: React.ReactNode; appCtx: IAppCtx }) => {
  return <AppCtxContext.Provider value={props.appCtx}>{props.children}</AppCtxContext.Provider>
}

export const useAppCtx = (): IAppCtx => {
  const app = useContext(AppCtxContext)
  if (!app) throw new Error('App not provided')

  return app
}
