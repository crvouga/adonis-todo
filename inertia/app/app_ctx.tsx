import { TodoListApi } from '#shared/todo_list/todo_list_api/impl'
import { ITodoListApi } from '#shared/todo_list/todo_list_api/interface'
import { createContext, useContext } from 'react'
import { AuthApi } from '~/auth/auth_api/impl'
import { IAuthApi } from '~/auth/auth_api/interface'

export type IAppCtx = {
  authApi: IAuthApi
  todoListApi: ITodoListApi
}

export const AppCtx = (): IAppCtx => {
  return {
    authApi: AuthApi(),
    todoListApi: TodoListApi(),
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
