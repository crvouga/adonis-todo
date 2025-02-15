import { mapOk, unwrapOr } from '#shared/result/result'
import { useQuery } from '@tanstack/react-query'
import { useAppCtx } from '~/app/app_ctx'
import { EmptyStateBlock } from '~/ui/empty_state_block'
import { TodoListCard } from './todo_list_card'

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

  return (
    <div data-testid="todo-list-cards" className="w-full">
      {items.length === 0 && (
        <EmptyStateBlock title="No todo lists found" renderIcon={() => null} />
      )}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((todoList) => (
          <TodoListCard key={todoList.id} todoList={todoList} />
        ))}
      </div>
    </div>
  )
}
