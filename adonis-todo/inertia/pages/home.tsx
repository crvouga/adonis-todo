import { Head, useForm } from '@inertiajs/react'
import GuardLoggedIn from '~/auth/guard_logged_in'
import { TodoListCardsLoader } from '~/todo_list/todo_list_cards'
import { Button } from '~/ui/button'

export default function Home() {
  return (
    <GuardLoggedIn>
      <Head title="Todo App" />

      {/* Top Navigation Bar */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Todo</a>
        </div>
        <div className="flex-none gap-2">
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <TodoListCardsLoader />
      </main>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-8">
        <div>
          <p>Todo App - Organize your tasks efficiently</p>
        </div>
      </footer>
    </GuardLoggedIn>
  )
}

function LogoutButton() {
  const { post, processing } = useForm()
  return (
    <form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault()
        post('/logout')
      }}
    >
      <Button color="ghost" type="submit" disabled={processing}>
        Logout
      </Button>
    </form>
  )
}
