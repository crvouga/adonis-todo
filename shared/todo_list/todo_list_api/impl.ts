import { Err, Ok, fromUnknownError } from '#shared/result/result'
import { TodoListDTO } from '#shared/todo_list/todo_list_dto'
import { ITodoListApi } from './interface'
import * as OpenApiClient from '#shared/open_api_client/index'

export type Config = {
  type: 'open-api'
}

export const TodoListApi = (_config: Config): ITodoListApi => {
  return {
    async list(_input) {
      try {
        const result = await OpenApiClient.getApiTodoLists({
          query: {
            page: 1,
            perPage: 10,
          },
        })

        if (result.error) return fromUnknownError(result.error)

        if (!result.data) return Err('The server returned an empty response')

        return Ok({
          items: result.data.items.flatMap((item): TodoListDTO[] => {
            if (
              !item.id ||
              !item.title ||
              !item.ownerUserId ||
              !item.createdAt ||
              !item.updatedAt
            ) {
              return []
            }

            const todoListDto: TodoListDTO = {
              id: item.id,
              title: item.title,
              ownerUserId: item.ownerUserId,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            }

            return [todoListDto]
          }),
          lastPage: result.data.lastPage,
          page: result.data.page,
          perPage: result.data.perPage,
          total: result.data.total,
        })
      } catch (error) {
        return fromUnknownError(error)
      }
    },
  }
}
