import { Link } from '@inertiajs/react'
import PageLayout from '~/page/layout'
import { TodoListCardsLoader } from '~/todo_list/todo_list_cards'

export default function Home() {
  return (
    <PageLayout title="Todo App">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lists</h1>
        <Link
          href="/todo-lists/create"
          className="btn btn-primary"
          data-testid="create-todo-list-button"
        >
          Create New List
        </Link>
      </div>
      <TodoListCardsLoader />
    </PageLayout>
  )
}
