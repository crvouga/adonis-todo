import { Paginated } from '#shared/pagination/paginated'
import { Pagination } from '#shared/pagination/pagination'
import { Result } from '#shared/result/result'
import { TodoListDTO } from '#shared/todo_list/todo_list_dto'

export type ITodoListApi = {
  list: (input: { pagination: Pagination }) => Promise<Result<Paginated<TodoListDTO>, string>>
}
