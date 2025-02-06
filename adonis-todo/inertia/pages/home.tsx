import { Head, Link } from '@inertiajs/react'
import { LogoutButton } from '~/auth/logout_button'
import MustBeLoggedIn from '~/auth/must_be_logged_in'
import { TodoListCardsLoader } from '~/todo_list/todo_list_cards'

export default function Home() {
  return (
    <MustBeLoggedIn>
      <Head title="Todo App" />

      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            Todo
          </Link>
        </div>
        <div className="flex-none gap-2">
          <LogoutButton />
        </div>
      </div>

      <main className="container mx-auto p-4">
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
      </main>
    </MustBeLoggedIn>
  )
}
