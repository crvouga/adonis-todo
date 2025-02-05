


import { mapOk, unwrapOr } from '#shared/result/result'
import { TodoListDTO } from '#shared/todo_list/todo_list_dto'
import { useQuery } from '@tanstack/react-query'
import { useAppCtx } from '~/app/app_ctx'
import { TodoListCard } from './todo_list_card'
import { EmptyStateBlock } from '~/ui/empty_state_block'

export const TodoListCardsLoader = () => {
  const { todoListApi } = useAppCtx()

  const { data } = useQuery({
    queryKey: ['todo-lists'],
    queryFn: () => todoListApi.list({ pagination: { page: 1, perPage: 10 } }),
  })

  if (!data) {
    return <div>Loading...</div>
  }

  const items = unwrapOr(
    mapOk(data, (data) => data.items),
    []
  )

  return <TodoListCards todoLists={items} />
}

const TodoListCards = (props: { todoLists: TodoListDTO[] }) => {
  if (props.todoLists.length === 0) {
    return <EmptyStateBlock title="No todo lists found" renderIcon={() => null} />
  }

  return (
    <div
      data-testid="todo-list-cards"
      className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {props.todoLists.map((todoList) => (
        <TodoListCard key={todoList.id} todoList={todoList} />
      ))}
    </div>
  )
}
