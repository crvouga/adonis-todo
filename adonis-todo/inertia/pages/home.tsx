import { Head } from '@inertiajs/react'
import { Button } from '~/ui/button'

export default function Home() {
  return (
    <>
      <Head title="Todo App" />

      {/* Top Navigation Bar */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Todo</a>
        </div>
        <div className="flex-none gap-2">
          <Button color="ghost">Logout</Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4"></main>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-8">
        <div>
          <p>Todo App - Organize your tasks efficiently</p>
        </div>
      </footer>
    </>
  )
}
