import { Head } from '@inertiajs/react'

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
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://ui-avatars.com/api/?name=User" alt="User Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="flex flex-col gap-6">
          {/* Todo List Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Todo Lists</h1>
            <button className="btn btn-primary">New List</button>
          </div>

          {/* Placeholder Todo Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Personal Tasks</h2>
                <p className="text-sm text-base-content/70">3 tasks remaining</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">View List</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Work Projects</h2>
                <p className="text-sm text-base-content/70">5 tasks remaining</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">View List</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Shopping List</h2>
                <p className="text-sm text-base-content/70">2 tasks remaining</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">View List</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-8">
        <div>
          <p>Todo App - Organize your tasks efficiently</p>
        </div>
      </footer>
    </>
  )
}
