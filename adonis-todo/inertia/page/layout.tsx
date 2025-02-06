import { Head, Link } from '@inertiajs/react'
import { LogoutButton } from '~/auth/logout_button'
import MustBeLoggedIn from '~/auth/must_be_logged_in'

export default function PageLayout(props: { title: string; children: React.ReactNode }) {
  return (
    <MustBeLoggedIn>
      <Head title={props.title} />
      <div className="min-h-screen flex flex-col bg-sand-2 w-screen">
        <div className="navbar bg-base-100 shadow-lg">
          <div className="flex-1">
            <Link href="/home" className="btn btn-ghost normal-case text-xl">
              Todo
            </Link>
          </div>
          <div className="flex-none gap-2">
            <LogoutButton />
          </div>
        </div>

        <main className="w-full h-full container mx-auto p-4">{props.children}</main>
      </div>
    </MustBeLoggedIn>
  )
}
