import { Head } from '@inertiajs/react'

export default function Login() {
  return (
    <>
      <Head title="Login" />

      <div>
        <h1>Login</h1>
        <form>
          <input type="email" />
          <input type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}
