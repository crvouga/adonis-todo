import { Err } from '#shared/result/result'
import { ITodoListApi } from './interface'

export const TodoListApi = (): ITodoListApi => {
  return {
    async list(_input) {
      return Err('Not implemented')
    },
  }
}
